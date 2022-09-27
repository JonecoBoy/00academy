import { UserEntity } from "../../../entities/user.entity";

// todo separar 
export class UpdateUserUseCaseParams {
  id: string;
  email?: string;
  password?: string;
  admin?: boolean;
  status?: boolean;
}

export interface UpdateUserInterface {
  execute(model: UpdateUserUseCaseParams): Promise<UserEntity>;
}
