import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  AuthLoginInterface,
  AuthLoginUseCaseParams,
} from "./login-auth.interface";
import { CourseEntity } from "@core/entities/course.entity";
import TYPES from "../../../types";

import { UserEntity } from "@core/entities/user.entity";
// import { AuthRepository } from "src/infra/auth/auth.repository";
import { AuthInterface } from "@core/providers/auth.interface";
import * as dotenv from 'dotenv'

@injectable()
export class AuthLoginUseCase implements AuthLoginInterface {
  private _authRepository: AuthInterface;

  constructor(
    @inject(TYPES.AuthLoginInterface)
    AuthRepository: AuthInterface
  ) {
    this._authRepository = AuthRepository;
  }

  execute(model: AuthLoginUseCaseParams): UserEntity {
    
    try{
    const validUser = process.env.user;
    const validPassword = process.env.password;

    if(model.password == validPassword && model.user == validUser){
      return UserEntity.build(1,validUser,validPassword,true)
    }
  }
    // criar repositorio de usuario só pra ter algum user la
    // colocar la uma array com os usuarios e tal para poder procurar e tambem se e admin e tal
    // colocar para usuario entrar num curso
    // const result = this._authRepository.login({
    //   user: model.user,
    //   password: model.password,
    // });

    catch{
      throw new Error('Cant Login')
    }
  }
}
