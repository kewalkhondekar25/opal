import dotenv from "dotenv";
dotenv.config();
import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import type { S3Event } from "aws-lambda";

const client = new SQSClient({
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
                        continue;
                    }
                }
                for(const record of event.Records){
                    const { s3 } = record;
                    const { bucket, object: { key } } = s3;
                    //spin docker
                    
                }
                
                //delete message from queue
            }
        } catch (error) {
            console.log(error);
        }
    }
};

main();
