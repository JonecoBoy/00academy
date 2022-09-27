import { UserEntity } from "../../../entities/user.entity";

export class DeleteUserUseCaseParams {
  id: string;
}

export interface DeleteUserInterface {
  execute(model: DeleteUserUseCaseParams): Promise<boolean>;
}
