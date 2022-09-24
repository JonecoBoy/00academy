import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  UpdateUserInterface,
  UpdateUserUseCaseParams,
} from "./update-user.interface";

import { UsersRepositoryInterface } from "@core/providers/users.repository.interface";
import TYPES from "../../../../types";

@injectable()
export class UpdateUserUseCase implements UpdateUserInterface {
  private _UserRepository: UsersRepositoryInterface;

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }
  
  execute(model: any): any {

    const result = this._UserRepository.update(model);

  return result;
  }
}
