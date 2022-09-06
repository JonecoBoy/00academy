import { UserEntity } from "@core/entities/user.entity";

export class DeleteUserUseCaseParams {
  id: number;
}

export interface DeleteUserInterface {
  execute(model: DeleteUserUseCaseParams): UserEntity;
}
