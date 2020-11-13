import express from 'express';
import Server from "./server";
import cors from 'cors';

async function run() {

  const app = express();

  app.use(cors());
  app.options('*', cors());

  const server = new Server(app);
  await server.configure();
  await server.start();
}

run().catch(e => {
  console.log(e);
})



