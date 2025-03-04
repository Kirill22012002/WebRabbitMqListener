const express = require("express");
const amqp = require("amqplib");
const WebSocket = require("ws");

const app = express();
const port = 3000;

const wss = new WebSocket.Server({ port: 8080 });

async function connectToRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "agentshub_from_queue";

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const message = msg.content.toString();
      console.log("Received:", message);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });

      channel.ack(msg);
    }
  });
}

connectToRabbitMQ().catch(console.error);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
