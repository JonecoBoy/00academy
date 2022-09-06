import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateUserInterface,
  CreateUserUseCaseParams,
} from "./create-user.interface";
import { UserEntity } from "@core/entities/user.entity";
import TYPES from "../../../../types";

import { UsersRepositoryInterface } from "../../../providers/users.repository.interface";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  private _UserRepository: UsersRepositoryInterface;

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }

  execute(model: CreateUserUseCaseParams): UserEntity {
    // verificar se ja nao existe o email

    const result = this._UserRepository.create({
      email: model.email,
      password: model.password,
      admin: model.admin,
      status: model.status,
    });

    return result;
  }
}
