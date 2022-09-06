import { UserEntity } from "@core/entities/user.entity";

export class SearchUserUseCaseParams {
  id: number;
}

export interface SearchUserInterface {
  execute(model: SearchUserUseCaseParams): UserEntity;
}
