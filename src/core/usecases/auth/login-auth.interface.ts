import { UserEntity } from "@core/entities/user.entity";

export class AuthLoginUseCaseParams {
  user: string;
  password: string;
}

export interface AuthLoginInterface {
  execute(model: AuthLoginUseCaseParams): UserEntity;
}
