
import { AuthLoginDto } from "../dtos/auth/auth-login.dto";
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


import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { AuthLoginInterface } from "@core/usecases/auth/login-auth.interface";
import { AuthLoginUseCase } from "@core/usecases/auth/login-auth.usecase";

@controller(`/auth`)
export class AuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _authLoginService: AuthLoginInterface;
  constructor(
    @inject(TYPES.SearchCourseInterface) searchCourseUseCase: AuthLoginInterface,
  ) {
    super();
    this._authLoginService = AuthLoginUseCase;
  }


  //listar todos os cursos disponíveis
  // @httpGet(`/`)
  // public async listAllCourses(
  //   @queryParam() query: ListCourseDto.Query
  // ): Promise<interfaces.IHttpActionResult> {


  //   const result: any[] = this._listCourseservice.execute({});

  //   if (!result){
  //     return this.json({
  //       message: 'Courses List is Empty'
  //     })
  //   }

  //   return this.json(result);
  // }

  //logar
  @httpPost(`/`, ValidateDtoMiddleware(AuthLoginDto.Body, `body`))
  public async createCourse(
    @requestBody() body: AuthLoginDto.Body
  ): Promise<interfaces.IHttpActionResult> {

    const result = this._authLoginService.execute({
      user:body.user,
      password:body.password
    })
    return this.json(result);
  }


}
