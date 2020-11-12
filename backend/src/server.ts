import {Express} from "express-serve-static-core";
import RoutesLoader from "./loaders/routes.loader";

const port = 8080;

export default class Server {
  constructor(readonly app: Express) {
  }

  /**
   *
   * @returns {Server}
   */
  async configure(): Promise<Server> {
    new RoutesLoader().load(this.app);
    return this;
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async start(): Promise<void> {
    this.app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  }
}
