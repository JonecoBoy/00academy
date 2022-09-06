import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  UpdateUserInterface,
  UpdateUserUseCaseParams,
} from "./update-user.interface";
import { UserEntity } from "@core/entities/user.entity";
import { BusinessError } from "../../../errors/business.error";
import { UserRepositoryInterface } from "@core/providers/users.repository.interface";
import TYPES from "../../../../types";

@injectable()
export class UpdateUserUseCase implements UpdateUserInterface {
  private _UserRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    UserRepository: UserRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }
  
  execute(model: any): any {

    const result = this._UserRepository.update(model);

  return result;
  }
}
