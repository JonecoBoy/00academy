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
import * as sha256 from 'crypto-js/sha256';
import * as aes from 'crypto-js/aes';


@injectable()
export class AuthLoginUseCase implements AuthLoginInterface {
  private _UserRepository: UsersRepositoryInterface;
  private _jwtService;

constructor(
  @inject(TYPES.UsersRepositoryInterface)UserRepository: UsersRepositoryInterface,

){
  this._UserRepository = UserRepository;


}
 

  async execute(model: AuthLoginUseCaseParams): Promise<string> {
    
    try{
      
    // procurar 
    const data = await this._UserRepository.searchCustom({email:model.email});

    const searchUser = data[0];
  
    if(!searchUser || searchUser.password !== sha256(process.env.PRIVATE_TOKEN+model.password).toString()){
      throw new Error('User email and/or password does not exists')
    } 
      // todo tirar daqui e por em um jwt provider
      const privateKey = process.env.PRIVATE_TOKEN;
      
      const token = jwt.sign({ email: searchUser.email }, privateKey);
      return token;
    }
    catch(message){
      throw new Error(message)
    }
  }
}
