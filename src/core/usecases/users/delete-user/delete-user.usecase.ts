import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  DeleteUserInterface,
  DeleteUserUseCaseParams,
} from "./delete-user.interface";

import { UsersRepositoryInterface } from "@core/providers/users.repository.interface";
import TYPES from "../../../../types";

@injectable()
export class DeleteUserUseCase implements DeleteUserInterface {
  private _UserRepository: UsersRepositoryInterface;

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }
  
  async execute(model: DeleteUserUseCaseParams): Promise<any> {

    const result = await this._UserRepository.delete(model);

  return result;
  }
}
