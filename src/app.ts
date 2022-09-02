import "reflect-metadata";

import * as express from "express";

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./presentation/controllers/courses.controller";
// import "./presentation/controllers/app.controller";

import { testControllerFactory } from "./presentation/controllers/testmiddleware.controller";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";

import { ListaCursoInterface } from "./core/usecases/courses/list-courses/list-course.interface";
import { ListaCursosUseCase } from "./core/usecases/courses/list-courses/list-course.usecase";

import { CriaCursoInterface } from "./core/usecases/courses/create-course/create-course.interface";
import { CriaCursoUseCase } from "./core/usecases/courses/create-course/create-course.usecase";

import { CursoRepositoryInterface } from "./core/providers/courses-repository.interface";
import { CursoRepository } from "./infra/repositories/courses.repository";

const PORT = process.env.PORT || 3001;

const container = new Container();

export class App {
  constructor() {
    this.configDependencies();
    this.createService();
  }

  configDependencies(): void {
    container
      .bind<ListaCursoInterface>(TYPES.ListaCursoInterface)
      .to(ListaCursosUseCase);
    container
      .bind<CriaCursoInterface>(TYPES.CriaCursoInterface)
      .to(CriaCursoUseCase);
    container
      .bind<CursoRepositoryInterface>(TYPES.CursoRepositoryInterface)
      .to(CursoRepository);
    container
      .bind<express.RequestHandler>(TYPES.CustomMiddleware)
      .toConstantValue(CustomMiddleware);

    testControllerFactory(container);
  }

  createService(): void {
    const server: InversifyExpressServer = new InversifyExpressServer(
      container
    );

    server.setConfig((app) => {
      // // add body parser
      // app.use(bodyParser.urlencoded({
      //     extended: true
      // }));

      app.use(express.json());
    });

    // todo: config server
    server.setErrorConfig((app) => {
      app.use((err, req, res, next) => {
        if (err) {
          if (err.name === `BusinessError`) {
            return res.status(400).json({
              mensagem: err.message,
            });
          }

          return res.status(500).json({
            mensagem: `Internal Server Error`,
          });
        }

        next();
      });
    });

    const app = server.build();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  }
}

export default new App();
