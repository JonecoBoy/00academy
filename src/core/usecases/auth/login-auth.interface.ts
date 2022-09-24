import { UserEntity } from "../../../core/entities/user.entity";

export class AuthLoginUseCaseParams {
  email: string;
  password: string;
}

export interface AuthLoginInterface {
  execute(model: AuthLoginUseCaseParams): Promise<string>;
}
