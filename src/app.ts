import express from "express";
import "dotenv/config";

import routes from "./routes";

export class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private database(): void {
    // por o sqlite
  }

  private routes(): void {
    // health checck
    this.express.use(routes);
  }
}

export default new App().express;
