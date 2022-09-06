import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  AuthLoginInterface,
  AuthLoginUseCaseParams,
} from "./login-auth.interface";
import TYPES from "../../../types";

import { UserEntity } from "../../../core/entities/user.entity";
import { UsersRepository } from "src/infra/repositories/users.repository";
import { AuthInterface } from "@core/providers/auth.interface";
// import { sign ,verify} from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { UsersRepositoryInterface } from "@core/providers/users.repository.interface";


@injectable()
export class AuthLoginUseCase implements AuthLoginInterface {
  private _UserRepository: UsersRepositoryInterface;
  private _jwtService;

constructor(
  @inject(TYPES.UsersRepositoryInterface)UserRepository: UsersRepositoryInterface,

){
  this._UserRepository = UserRepository;


}
 

  execute(model: AuthLoginUseCaseParams): string {
    
    try{
      
    // procurar 
    const searchUser = this._UserRepository.searchByEmail(model);

    if(!searchUser || searchUser.password !== searchUser.password){
      throw new Error('User email and/or password does not exists')
    } 
      // todo tirar daqui e por em um jwt provider
      const privateKey = '2215x5as4224sf'
      
      const token = jwt.sign({ email: searchUser.email }, privateKey);
      return token;
    }
    catch{
      throw new Error('Cant Login')
    }
  }
}
