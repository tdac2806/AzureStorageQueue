
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

let number = 0;

setInterval(function () {
   AddMessage()
}, 1000)


async function AddMessage() {
   if (await queueClient.exists() == false) {
      // Create the queue
      await queueClient.create();
   }
   else {
      messageText = "Hello, World " + number++;
      console.log("Adding message to the queue: ", messageText);
      // Add a message to the queue
      queueClient.sendMessage(messageText);
   }
}