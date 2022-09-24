import { Date } from "mongoose";

export class UserEntity {
  public id: string;
  public email: string;
  public password: string;
  public admin: boolean;
  public status: boolean;
  public updated_at: Date;
  public created_at: Date;

  constructor(userId: string, email: string, password: string,admin: boolean,status: boolean, updated_at: Date, created_at: Date) {
    this.id = userId;
    this.email = email;
    this.password = password;
    this.admin= admin;
    this.status = status;
  }

  
  static build(
    userId: string,
    email: string,
    password: string,
    admin: boolean, 
    status: boolean,
    updated_at: Date,
    created_at: Date
  ): UserEntity {
    return new UserEntity(userId, email, password,admin, status, updated_at, created_at);
  }
}
