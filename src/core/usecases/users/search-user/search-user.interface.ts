import { UserEntity } from "../../../entities/user.entity";

export class SearchUserUseCaseParams {
  id: number;
}

export interface SearchUserInterface {
  execute(model: SearchUserUseCaseParams): UserEntity;
}
