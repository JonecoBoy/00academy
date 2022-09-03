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
  results,
  params,
  httpDelete,
} from "inversify-express-utils";
import TYPES from "../../types";

import { ListCoursesInterface } from "../../core/usecases/courses/list-courses/list-course.interface";
import { ListCourseDto } from "../../presentation/dtos/courses/list-courses.dto";

import { CreateCourseDto } from "../../presentation/dtos/courses/create-course.dto";
import { CreateCourseInterface } from "../../core/usecases/courses/create-course/create-course.interface";

import { SearchCourseInterface } from "@core/usecases/courses/search-course/search-course.interface";
import { SearchCourseDto } from "@presentation/dtos/courses/search-course.dto";

import { UpdateCourseInterface } from "@core/usecases/courses/update-course/update-course.interface";
import { UpdateCourseDto } from "../../presentation/dtos/courses/update-course.dto";

import { DeleteCourseInterface } from "@core/usecases/courses/delete-course/delete-course.interface";
import { DeleteCourseDto } from "../../presentation/dtos/courses/delete-course.dto";

import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";

@controller(`/courses`)
export class CoursesController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _listCourseservice: ListCoursesInterface;
  private _createCourseervice: CreateCourseInterface;
  private _searchCourseService: SearchCourseInterface;
  private _updateCourseService: UpdateCourseInterface;
  private _deleteCourseService: DeleteCourseInterface;

  constructor(
    @inject(TYPES.ListCoursesInterface) listCourseUseCase: ListCoursesInterface,
    @inject(TYPES.CreateCourseInterface) createCourseUseCase: CreateCourseInterface,
    @inject(TYPES.SearchCourseInterface) searchCourseUseCase: SearchCourseInterface,
    @inject(TYPES.UpdateCourseInterface) updateCourseUseCase: UpdateCourseInterface,
    @inject(TYPES.DeleteCourseInterface) deleteCourseUseCase: DeleteCourseInterface
  ) {
    super();
    this._listCourseservice = listCourseUseCase;
    this._createCourseervice = createCourseUseCase;
    this._searchCourseService = searchCourseUseCase;
    this._updateCourseService = updateCourseUseCase;
    this._deleteCourseService = deleteCourseUseCase;
  }


  //listar todos os cursos disponíveis
  @httpGet(`/`)
  public async listAllCourses(
    @queryParam() query: ListCourseDto.Query
  ): Promise<interfaces.IHttpActionResult> {


    const result: any[] = this._listCourseservice.execute({});

    if (!result){
      return this.json({
        message: 'Courses List is Empty'
      })
    }

    return this.json(result);
  }

  //listar um curso apenas
  @httpGet(`/:id`)
  public async getCourseById(
    @requestParam(`id`) id: number
  ): Promise<interfaces.IHttpActionResult> {
    try {

      const result = this._searchCourseService.execute({id});

      return this.json(result);
    } catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }

  //criar um curso
  @httpPost(`/`, ValidateDtoMiddleware(CreateCourseDto.Body, `body`))
  public async createCourse(
    @requestBody() body: CreateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    const result = this._createCourseervice.execute({
      dataInicio: body.dataInicio,
      descricao: body.descricao,
      status: body.status,
    });

    return this.json(result);
  }

    //editar um curso
  @httpPut(
    `/:id`,
    ValidateDtoMiddleware(UpdateCourseDto.Params, `params`),
    ValidateDtoMiddleware(UpdateCourseDto.Body, `body`)
  )
  public async update(
    @requestParam(`id`) id: number,
    @requestBody() body: UpdateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    try{
      const descricao = body.descricao;
      const status:boolean = body.status;
      const result = this._updateCourseService.execute({id,descricao,status});
      return this.json(result);

    }
    catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }

  }

    //deletar um curso
    @httpDelete(
      `/:id`,
      ValidateDtoMiddleware(DeleteCourseDto.Params, `params`),
    )
    public async Delete(
      @requestParam(`id`) id: number,
    ): Promise<interfaces.IHttpActionResult> {
      try{
        const result = this._deleteCourseService.execute({id});
        return this.json(result);
  
      }
      catch (error) {
        if (error.name === `BusinessError`) {
          return this.badRequest(error.message);
        }
  
        return this.internalServerError(error.message);
      }
  
    }

}
