import dotenv from "dotenv";
dotenv.config();
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import type { S3Event } from "aws-lambda";
import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

const client = new SQSClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
});

const ecsClient = new ECSClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
});

const main = async () => {
    
    const command = new ReceiveMessageCommand({
        QueueUrl: process.env.QUEUE_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10
    });

    while(true){

        try {
            const { Messages } = await client.send(command);
            
            if(!Messages){
                console.log("No messages yet");
                continue;
            };

            for(const message of Messages){
                const { Body, MessageId } = message;
                
                console.log("message received", { Body, MessageId });
    
                //validate
                if(!Body) continue;
                const event = JSON.parse(Body) as S3Event;

                if("Service" in event && "Event" in event){
                    if(event.Event === "s3:TestEvent"){
                        await client.send(new DeleteMessageCommand({
                            QueueUrl: process.env.QUEUE_URL,
                            ReceiptHandle: message.ReceiptHandle
                        }));
                        continue;
                    }
                }
                for(const record of event.Records){
                    const { s3 } = record;
                    const { bucket, object: { key } } = s3;
                    //spin docker
                    const runTaskCommand = new RunTaskCommand({
                        taskDefinition: process.env.ECS_TASK_DEFINATION,
                        cluster:process.env.ECS_CLUSTER,
                        launchType: "FARGATE",
                        networkConfiguration: {
                            awsvpcConfiguration: {
                                assignPublicIp: "ENABLED",
                                securityGroups: process.env.ECS_SECURITY_GROUP?.split(",").map(s => s.trim()),
                                subnets: process.env.ECS_SUBNETS?.split(",").map(s => s.trim()),
                            }
                        },
                        overrides: {
                            containerOverrides: [{ 
                                name: "opal-video-transcoder-container",
                                environment: [
                                    { name: "ACCESS_KEY", value: process.env.ACCESS_KEY },
                                    { name: "SECRET_ACCESS_KEY", value: process.env.SECRET_ACCESS_KEY },
                                    { name: "BUCKET", value: bucket.name },
                                    { name: "KEY", value: key },
                                    { name: "FINAL_BUCKET", value: process.env.FINAL_BUCKET }
                                ]
                            }],
                        },
                    });
                    await ecsClient.send(runTaskCommand);
                    //delete message from queue
                    await client.send(new DeleteMessageCommand({
                        QueueUrl: process.env.QUEUE_URL,
                        ReceiptHandle: message.ReceiptHandle
                    }));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
};

main();
