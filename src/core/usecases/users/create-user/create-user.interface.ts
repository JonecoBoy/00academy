import { UserEntity } from "@core/entities/user.entity";

export class CreateUserUseCaseParams {
  email: string;
  password: string;
  admin: boolean;
  status: boolean;
  students?: UserEntity[];
}

export interface CreateUserInterface {
  execute(model: CreateUserUseCaseParams): UserEntity;
}
