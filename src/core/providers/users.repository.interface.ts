import { UserEntity } from "../entities/user.entity";

export type UsersRespositorySearchParams = {
  id?: string;
  email?: string;
};

export type UsersRespositoryCreateParams = {
  email: string;
  password: string;
  admin: boolean;
  status: boolean;
};

export type UsersRespositoryUpdateParams = {
  id:string;
  email?: string;
  password?: string;
  admin?: boolean;
  status?: boolean;
  students?:string[];
};

export type UsersRespositoryDeleteParams = {
  id: string;
};

export interface UsersRepositoryInterface {
  list(model: UsersRespositorySearchParams): Promise<Array<UserEntity>>;
  searchByEmail(model: UsersRespositorySearchParams): Promise<UserEntity>;
  search(model: UsersRespositorySearchParams): Promise<UserEntity>;
  searchCustom(model: any): Promise<Array<UserEntity>>;
  create(model: UsersRespositoryCreateParams): Promise<boolean>;
  update(model: UsersRespositoryUpdateParams): Promise<UserEntity>;
  delete(model: UsersRespositoryDeleteParams): Promise<boolean>;
  getLastId(): Promise<any>;
  
}
