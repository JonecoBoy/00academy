import * as express from "express";
import { httpGet, controller } from "inversify-express-utils";
import TYPES from "../../types";
import { Container } from "inversify";
const { version, name, author } = require('../../../package.json')

export const baseController = (container: Container): any => {
  // HealthCheck
  @controller(`/`)
  class BaseController {
    @httpGet(`/`, container.get<express.RequestHandler>(TYPES.CustomMiddleware))
    public getAppVersion(req: any, res: any) {
      res.send({
        name,
        version,
        author
      })
    }
  }

  return BaseController;
};
