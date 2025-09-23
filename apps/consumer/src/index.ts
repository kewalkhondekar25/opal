import dotenv from "dotenv";
dotenv.config();
import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";

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
        
        const { Messages } = await client.send(command);
        
        if(!Messages){
            console.log("No messages yet");
            continue;
        };

        for(const message of Messages){
            const { Body, MessageId } = message;
            console.log("message received", { Body, MessageId });
        }
    }
};

main();
