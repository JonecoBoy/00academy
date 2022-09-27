import { UserEntity } from "../../../entities/user.entity";

export class SearchUserUseCaseParams {
  id: string;
}

export interface SearchCustomUserInterface {
  execute(model: object): Promise<Array<UserEntity>>;
}
