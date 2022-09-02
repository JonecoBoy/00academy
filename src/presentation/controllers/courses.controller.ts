import * as express from "express";
import { inject } from "inversify";
import {
  httpGet,
  BaseHttpController,
  interfaces,
  controller,
  queryParam,
  requestParam,
  httpPost,
  requestBody,
  httpPut,
} from "inversify-express-utils";
import TYPES from "../../types";

import { ListaCursoInterface } from "../../core/usecases/courses/list-courses/list-course.interface";
import { ListCourseDto } from "../../presentation/dtos/courses/list-courses.dto";
import { CreateCourseDto } from "../../presentation/dtos/courses/create-course.dto";
import { CriaCursoInterface } from "../../core/usecases/courses/create-course/create-course.interface";
// import { validate } from "class-validator";
import { UpdateCourseDto } from "../../presentation/dtos/courses/update-course.dto";

import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";

@controller(`/courses`)
export class CoursesController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _listCourseservice: ListaCursoInterface;
  private _criaCourseservice: CriaCursoInterface;

  constructor(
    @inject(TYPES.ListaCursoInterface) listaCursoUseCase: ListaCursoInterface,
    @inject(TYPES.CriaCursoInterface) criaCursoUseCase: CriaCursoInterface
  ) {
    super();
    this._listCourseservice = listaCursoUseCase;
    this._criaCourseservice = criaCursoUseCase;
  }

  @httpGet(`/`)
  public async lista(
    @queryParam() query: ListCourseDto.Query
  ): Promise<interfaces.IHttpActionResult> {
    // todo:recuperar dados da request
    console.log(query);

    // todo: invocar usecase
    const resultado: any[] = this._listCourseservice.execute({});

    return this.json(resultado);
  }

  @httpGet(`/:id`)
  public async buscaPorId(
    @requestParam(`id`) id: string
  ): Promise<interfaces.IHttpActionResult> {
    try {
      // todo:recuperar dados da request
      console.log(id);

      // todo:validar os dados recuperados

      // todo:construir payload do usecase

      // todo: invocar usecase

      return this.json({
        id: 1,
        descricao: `teste curso 1`,
        status: `inativo`,
      });
    } catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }

  @httpPost(`/`, ValidateDtoMiddleware(CreateCourseDto.Body, `body`))
  public async cria(
    @requestBody() body: CreateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    // //todo: recolher do contexto
    // console.log(body);

    // todo: invocar camada de negócio
    const result = this._criaCourseservice.execute({
      dataInicio: body.dataInicio,
      descricao: body.descricao,
    });

    // todo: montar saida conforme definicao no dto do presentation
    return this.json(result);
  }

  @httpPut(
    `/:id`,
    ValidateDtoMiddleware(UpdateCourseDto.Params, `params`),
    ValidateDtoMiddleware(UpdateCourseDto.Body, `body`)
  )
  public async altera(
    @requestParam(`:id`) params: string,
    @requestBody() body: UpdateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    console.log(params);
    console.log(body);

    return this.json({
      mensagem: `sucesso`,
      data: {
        id: `string`,
        descricao: `string`,
        status: `ativo`,
      },
    });
  }
}
