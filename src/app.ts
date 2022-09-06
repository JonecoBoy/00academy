import "reflect-metadata";

import * as express from "express";

import * as dotenv  from "dotenv";

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

// importar os controllers que automaticamente serão linkadas as rotas
import "./presentation/controllers/courses.controller";
import "./presentation/controllers/auth.controller";
import "./presentation/controllers/users.controller";

import { baseController } from "./presentation/controllers/base.controller";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";

import { ListCoursesInterface } from "./core/usecases/courses/list-courses/list-course.interface";
import { ListaCoursesUseCase } from "./core/usecases/courses/list-courses/list-course.usecase";

import { CreateCourseInterface } from "./core/usecases/courses/create-course/create-course.interface";
import { CriaCourseUseCase } from "./core/usecases/courses/create-course/create-course.usecase";

import { SearchCourseInterface } from "./core/usecases/courses/search-course/search-course.interface";
import { SearchCourseUseCase } from "./core/usecases/courses/search-course/search-course.usecase";

import { UpdateCourseInterface } from "./core/usecases/courses/update-course/update-course.interface";
import { UpdateCourseUseCase } from "./core/usecases/courses/update-course/update-course.usecase";

import { DeleteCourseInterface } from "./core/usecases/courses/delete-course/delete-course.interface";
import { DeleteCourseUseCase } from "./core/usecases/courses/delete-course/delete-course.usecase";

import { CourseRepositoryInterface } from "./core/providers/courses-repository.interface";
import { CourseRepository } from "./infra/repositories/courses.repository";


import { ListUsersInterface } from "./core/usecases/users/list-users/list-users.interface";
import { ListUsersUseCase } from "./core/usecases/users/list-users/list-users.usecase";

import { CreateUserInterface } from "./core/usecases/users/create-user/create-user.interface";
import { CreateUserUseCase } from "./core/usecases/users/create-user/create-user.usecase";

import { SearchUserInterface } from "./core/usecases/users/search-user/search-user.interface";
import { SearchUserUseCase } from "./core/usecases/users/search-user/search-user.usecase";

import { UpdateUserInterface } from "./core/usecases/users/update-user/update-user.interface";
import { UpdateUserUseCase } from "./core/usecases/users/update-user/update-user.usecase";

import { DeleteUserInterface } from "./core/usecases/users/delete-user/delete-user.interface";
import { DeleteUserUseCase } from "./core/usecases/users/delete-user/delete-user.usecase";

import { UsersRepositoryInterface } from "./core/providers/users.repository.interface";
import { UsersRepository } from "./infra/repositories/users.repository";

import { AuthLoginInterface } from "./core/usecases/auth/login-auth.interface";
import { AuthLoginUseCase } from "./core/usecases/auth/login-auth.usecase";

const PORT = process.env.PORT || 3001;

const container = new Container();

export class App {
  constructor() {
    this.configDependencies();
    this.createService();
    dotenv.config()
  }

  configDependencies(): void {
    // voce binda uma interface especificando um type para um useCase
    container
      .bind<ListCoursesInterface>(TYPES.ListCoursesInterface)
      .to(ListaCoursesUseCase);
    container
      .bind<CreateCourseInterface>(TYPES.CreateCourseInterface)
      .to(CriaCourseUseCase);
    container
    .bind<SearchCourseInterface>(TYPES.SearchCourseInterface)
    .to(SearchCourseUseCase);
    container
    .bind<UpdateCourseInterface>(TYPES.UpdateCourseInterface)
    .to(UpdateCourseUseCase);
    container
    .bind<DeleteCourseInterface>(TYPES.DeleteCourseInterface)
    .to(DeleteCourseUseCase);
  container
      .bind<CourseRepositoryInterface>(TYPES.CourseRepositoryInterface)
      .to(CourseRepository);

      container
      .bind<ListUsersInterface>(TYPES.ListUsersInterface)
      .to(ListUsersUseCase);
    container
      .bind<CreateUserInterface>(TYPES.CreateUserInterface)
      .to(CreateUserUseCase);
    container
    .bind<SearchUserInterface>(TYPES.SearchUserInterface)
    .to(SearchUserUseCase);
    container
    .bind<UpdateUserInterface>(TYPES.UpdateUserInterface)
    .to(UpdateUserUseCase);
    container
    .bind<DeleteUserInterface>(TYPES.DeleteUserInterface)
    .to(DeleteUserUseCase);
  container
      .bind<UsersRepositoryInterface>(TYPES.UsersRepositoryInterface)
      .to(UsersRepository);


  container
  .bind<AuthLoginInterface>(TYPES.AuthLoginInterface)
  .to(AuthLoginUseCase);
    container
      .bind<express.RequestHandler>(TYPES.CustomMiddleware)
      .toConstantValue(CustomMiddleware);

    baseController(container);
  }

  createService(): void {
    const server: InversifyExpressServer = new InversifyExpressServer(
      container
    );

    server.setConfig((app) => {
      app.use(express.json());
    });


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
