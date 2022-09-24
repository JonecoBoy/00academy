export class UserEntity {
  public id: number;
  public email: string;
  public password: string;
  public admin: boolean;
  public status: boolean;

  constructor(userId: number, email: string, password: string,admin: boolean,status: boolean) {
    this.id = userId;
    this.email = email;
    this.password = password;
    this.admin= admin;
    this.status = status;
  }

  
  static build(
    userId: number,
    email: string,
    password: string,
    admin: boolean, 
    status: boolean
  ): UserEntity {
    return new UserEntity(userId, email, password,admin, status);
  }
}
