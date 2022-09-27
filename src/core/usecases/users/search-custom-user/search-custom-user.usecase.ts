import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  SearchCustomUserInterface,
  SearchUserUseCaseParams,
} from "./search-custom-user.interface";
import { UsersRepositoryInterface } from "../../../providers/users.repository.interface";
import TYPES from "../../../../types";
import { UserEntity } from "@core/entities/user.entity";

//todo search by email

@injectable()
export class SearchCustomUserUseCase implements SearchCustomUserInterface {
  private _UserRepository: UsersRepositoryInterface;

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface
  ) {
    this._UserRepository = UserRepository;
  }
  
  execute(model: SearchUserUseCaseParams): Promise<Array<UserEntity>> {

    const result = this._UserRepository.searchCustom(model);

  return result;
  }
}
