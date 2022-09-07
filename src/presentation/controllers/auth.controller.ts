
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
  requestHeaders,
} from "inversify-express-utils";
import TYPES from "../../types";


import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { AuthLoginInterface } from "@core/usecases/auth/login-auth.interface";
import { AuthDtoMiddleware } from "../../presentation/middlewares/auth-dto.middleware";

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
  public async login(
    @requestBody() body: AuthLoginDto.Body
  ): Promise<interfaces.IHttpActionResult> {

    const result = this._authLoginService.execute({
      email:body.email,
      password:body.password
    })
    return this.json(result);
  }

    //verificar Login
    @httpGet(`/validate/`, AuthDtoMiddleware(`bearer`))
    public async validateLogin(
      @requestHeaders() headers: any
    ): Promise<interfaces.IHttpActionResult> {
  
      let result=`sucess`;
      return this.json(result,200);
      
    }
  


}
