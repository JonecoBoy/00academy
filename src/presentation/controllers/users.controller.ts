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

import { ListUsersInterface } from "../../core/usecases/users/list-users/list-users.interface";
import { ListUsersDto } from "../../presentation/dtos/users/list-users.dto";

import { CreateUserDto } from "../../presentation/dtos/users/create-user.dto";
import { CreateUserInterface } from "../../core/usecases/users/create-user/create-user.interface";

import { SearchUserInterface } from "../../core/usecases/users/search-user/search-user.interface";
import { SearchUserDto } from "@presentation/dtos/users/search-user.dto";

import { UpdateUserInterface } from "../../core/usecases/users/update-user/update-user.interface";
import { UpdateUserDto } from "../../presentation/dtos/users/update-user.dto";

import { DeleteUserInterface } from "../../core/usecases/users/delete-user/delete-user.interface";
import { DeleteUserDto } from "../../presentation/dtos/users/delete-user.dto";

import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { UserEntity } from "../../core/entities/user.entity";
import { AuthDtoMiddleware } from "../../presentation/middlewares/auth-dto.middleware";
import { AuthAdminDtoMiddleware } from "../../presentation/middlewares/auth-admin-dto.middleware";
import { SearchCustomUserInterface } from "../../core/usecases/users/search-custom-user/search-custom-user.interface";

@controller(`/users`)
export class UsersController
  extends BaseHttpController
  implements interfaces.Controller
{
  private _listUserservice: ListUsersInterface;
  private _createUserervice: CreateUserInterface;
  private _searchUserService: SearchUserInterface;
  private _updateUserService: UpdateUserInterface;
  private _deleteUserService: DeleteUserInterface;
  private _searchCustomUserService: SearchCustomUserInterface;

  constructor(
    @inject(TYPES.ListUsersInterface) listUserUseCase: ListUsersInterface,
    @inject(TYPES.CreateUserInterface) createUserUseCase: CreateUserInterface,
    @inject(TYPES.SearchUserInterface) searchUserUseCase: SearchUserInterface,
    @inject(TYPES.SearchCustomUserInterface) searchCustomUserUseCase: SearchCustomUserInterface,
    @inject(TYPES.UpdateUserInterface) updateUserUseCase: UpdateUserInterface,
    @inject(TYPES.DeleteUserInterface) deleteUserUseCase: DeleteUserInterface
  ) {
    super();
    this._listUserservice = listUserUseCase;
    this._createUserervice = createUserUseCase;
    this._searchUserService = searchUserUseCase;
    this._searchCustomUserService = searchCustomUserUseCase;
    this._updateUserService = updateUserUseCase;
    this._deleteUserService = deleteUserUseCase;
  }


  //listar todos os usuarios disponíveis
  @httpGet(`/`)
  public async listAllUsers(
    @queryParam() query: ListUsersDto.Query
  ): Promise<interfaces.IHttpActionResult> {

try{
    const result: UserEntity[] = await this._listUserservice.execute({});

    if (!result){
      return this.json({
        message: 'Users List is Empty'
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

  //listar usuarios baseado em um filtro
  @httpGet(`/search`)
  public async getCourseByCustomFilter(
    @queryParam() params,
  ): Promise<interfaces.IHttpActionResult> {
    try {

     const result = await this._searchCustomUserService.execute(params);

      return this.json(result);
    } catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }


  //listar um usuario apenas
  @httpGet(`/:id`,AuthDtoMiddleware(`bearer`),)
  public async getUserById(
    @requestParam(`id`) id: string
  ): Promise<interfaces.IHttpActionResult> {
    try {

      const result = await this._searchUserService.execute({id});

      if(!result){
        throw new Error (`User does not Exists`);
      }

      return this.json(result);
    } catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }
  }

  //criar um usuario
  @httpPost(`/`, 
  AuthDtoMiddleware(`bearer`),
  AuthAdminDtoMiddleware(`bearer`),
  ValidateDtoMiddleware(CreateUserDto.Body, `body`))
  public async createUser(
    @requestBody() body: CreateUserDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    try{
    const result = await this._createUserervice.execute({
      email: body.email,
      password: body.password,
      admin: body.admin,
      status: body.status,
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

    //editar um usuario
  @httpPut(
    `/:id`,
    AuthDtoMiddleware(`bearer`),
    ValidateDtoMiddleware(UpdateUserDto.Params, `params`),
    ValidateDtoMiddleware(UpdateUserDto.Body, `body`)
  )
  public async update(
    @requestParam(`id`) id: string,
    @requestBody() body: UpdateUserDto.Body
  ): Promise<interfaces.IHttpActionResult> {
    try{
      const result = await this._updateUserService.execute({id:id,...body});
      return this.json(result);

    }
    catch (error) {
      if (error.name === `BusinessError`) {
        return this.badRequest(error.message);
      }

      return this.internalServerError(error.message);
    }

  }

    //deletar um usuario
    @httpDelete(
      `/:id`,
      AuthDtoMiddleware(`bearer`),
      ValidateDtoMiddleware(DeleteUserDto.Params, `params`),
    )
    public async Delete(
      @requestParam(`id`) id: DeleteUserDto.Params,
    ): Promise<interfaces.IHttpActionResult> {
      try{
        const result = await this._deleteUserService.execute(id);

        if(!result){
          throw new Error (`User does not Exists`);
        }
        else{
        return this.json(`User ID ${id} successfully deleted`);
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
