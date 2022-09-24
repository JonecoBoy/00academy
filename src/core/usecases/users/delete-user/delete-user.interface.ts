import { UserEntity } from "../../../entities/user.entity";

export class DeleteUserUseCaseParams {
  id: number;
}

export interface DeleteUserInterface {
  execute(model: DeleteUserUseCaseParams): UserEntity;
}
