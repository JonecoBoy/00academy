import { UserEntity } from "@core/entities/user.entity";

export class CreateUserUseCaseParams {
  email: string;
  password: string;
  admin: boolean;
  status: boolean;
}

export interface CreateUserInterface {
  execute(model: CreateUserUseCaseParams): UserEntity;
}
