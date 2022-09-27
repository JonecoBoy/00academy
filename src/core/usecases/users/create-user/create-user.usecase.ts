import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateUserInterface,
  CreateUserUseCaseParams,
} from "./create-user.interface";
import { UserEntity } from "../../../entities/user.entity";
import TYPES from "../../../../types";

import { UsersRepositoryInterface } from "../../../providers/users.repository.interface";
import { IsUUID } from "class-validator";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  private _UserRepository: UsersRepositoryInterface;

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }

  async execute(model: CreateUserUseCaseParams): Promise<boolean> {
    // verificar se ja nao existe o email

    try{
    const result = await this._UserRepository.create({
      email: model.email,
      password: model.password,
      admin: model.admin,
      status: model.status,
    });
    if(result){
      return true;
    }
    
  }
  catch(error){
    throw new Error(error);
  }
  }
}
