import { UserEntity } from "../entities/user.entity";

export type UsersRespositorySearchParams = {
  id?: number;
  email?: string;
};

export type UsersRespositoryCreateParams = {
  email: string;
  password: string;
  admin: boolean;
  status: boolean;
};

export type UsersRespositoryUpdateParams = {
  id:number;
  email?: string;
  password?: string;
  admin?: boolean;
  status?: boolean;
  students?:number[];
};

export type UsersRespositoryDeleteParams = {
  id: number;
};

export interface UsersRepositoryInterface {
  list(model: UsersRespositorySearchParams): Promise<Array<UserEntity>>;
  searchByEmail(model: UsersRespositorySearchParams): Promise<UserEntity>;
  search(model: UsersRespositorySearchParams): Promise<UserEntity>;
  create(model: UsersRespositoryCreateParams): Promise<UserEntity>;
  update(model: UsersRespositoryUpdateParams): Promise<UserEntity>;
  delete(model: UsersRespositoryDeleteParams): any;
}
