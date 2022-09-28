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
import { AuthDtoMiddleware } from "../../presentation/middlewares/auth-dto.middleware";
import { AuthAdminDtoMiddleware } from "../middlewares/auth-admin-dto.middleware";
import * as dayjs from 'dayjs'

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

    try{
    const result: any[] = await this._listCourseservice.execute({});

    if (!result){
      return this.json({
        message: 'Courses List is Empty'
      })
    }

    return this.json(result);
  }
  catch (error) {
    if (error.name === `BusinessError`) {
      return this.badRequest(error.message);
    }

    return this.internalServerError(error.message);
  }
  }

  //listar um curso apenas
  @httpGet(`/:id`)
  public async getCourseById(
    @requestParam(`id`) id: string
  ): Promise<interfaces.IHttpActionResult> {
    try {

      const result = await this._searchCourseService.execute({id});

      return this.json(result);
    } catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }

    

  //criar um curso
  @httpPost(`/`,
  AuthDtoMiddleware(`bearer`),
  AuthAdminDtoMiddleware(`bearer`),
   ValidateDtoMiddleware(CreateCourseDto.Body, `body`))
  public async createCourse(
    @requestBody() body: CreateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    try{
    const result = await this._createCourseervice.execute({
      name: body.name,
      slug: body.slug,
      status: body.status,
      students: body.students,
      lessons: body.lessons,
      released_at: body.released_at,
    });

    return this.json(result);
  }

catch (error) {
  if (error.name === `BusinessError`) {
    return this.badRequest(error.message);
  }

  return this.internalServerError(error.message);
}
  }

    //editar um curso
  @httpPut(
    `/:id`,
    AuthDtoMiddleware(`bearer`),
    AuthAdminDtoMiddleware(`bearer`),
    ValidateDtoMiddleware(UpdateCourseDto.Params, `params`),
    ValidateDtoMiddleware(UpdateCourseDto.Body, `body`)
  )
  public async update(
    @requestParam(`id`) id: string,
    @requestBody() body: UpdateCourseDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    try{
      const name = body.name;
      const slug = body.slug;
      const status:boolean = body.status;
      const students:string[]=body.students;
      const released_at = dayjs(body.released_at).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
      const lessons =null;
      const result = await this._updateCourseService.execute({id,name,slug,status,students,lessons,released_at});
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
      AuthDtoMiddleware(`bearer`),
      AuthAdminDtoMiddleware(`bearer`),
      ValidateDtoMiddleware(DeleteCourseDto.Params, `params`),
    )
    public async Delete(
      @requestParam(`id`) id: DeleteCourseDto.Params
    ): Promise<interfaces.IHttpActionResult> {
      try{
        const result = await this._deleteCourseService.execute(id);
        if(!result){
          throw new Error (`Course does not Exists`);
        }
        else{
        return this.json(`Course ID ${id} successfully deleted`);
        }
  
      }
      catch (error) {
        if (error.name === `BusinessError`) {
          return this.badRequest(error.message);
        }
  
        return this.internalServerError(error.message);
      }
  
    }

}
