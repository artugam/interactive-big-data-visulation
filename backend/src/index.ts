import express from 'express';
import Server from "./server";

async function run() {
  const app = express();
  const server = new Server(app);
  await server.configure();
  await server.start();
}

run().catch(e => {
  console.log(e);
})



