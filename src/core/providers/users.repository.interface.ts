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
  list(model: UsersRespositorySearchParams): Promise<any>;
  searchByEmail(model: UsersRespositorySearchParams): UserEntity;
  search(model: UsersRespositorySearchParams): UserEntity;
  create(model: UsersRespositoryCreateParams): UserEntity;
  update(model: UsersRespositoryUpdateParams): UserEntity;
  delete(model: UsersRespositoryDeleteParams): any;
}
