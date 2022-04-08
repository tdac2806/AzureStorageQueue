const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

require("dotenv").config()

// Retrieve the connection from an environment
// variable called AZURE_STORAGE_CONNECTION_STRING
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING

// Create a unique name for the queue
const queueName = process.env.QUEUE_NAME;

// Instantiate a QueueServiceClient which will be used
// to create a QueueClient and to list all the queues
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

// Get a QueueClient which will be used
// to create and manipulate a queue
const queueClient = queueServiceClient.getQueueClient(queueName);

setInterval(function () {
   UpdateMessage()
}, 100)

let count = 0;
async function UpdateMessage() {
   if (await queueClient.exists() == true) {
      // Get the first message in the queue
      var receivedMessages = await queueClient.receiveMessages();
      const firstMessage = receivedMessages.receivedMessageItems[0];
      if (count == 10) {
         console.log("Error")
         count = 0;
      }
      else {
         if (firstMessage) {
            if (firstMessage.messageText != "This message has been Read") {
               console.log(firstMessage.messageText)
               // Update the received message
               await queueClient.updateMessage(
                  firstMessage.messageId,
                  firstMessage.popReceipt,
                  "This message has been Read"
               );
               count++;
            }
         }
      }

   }
}