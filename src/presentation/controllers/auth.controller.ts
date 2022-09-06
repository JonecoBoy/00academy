
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

@controller(`/auth`)
export class AuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _authLoginService: AuthLoginInterface;
  constructor(
    @inject(TYPES.AuthLoginInterface) AuthLoginUseCase: AuthLoginInterface,
  ) {
    super();
    this._authLoginService = AuthLoginUseCase;
  }


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
