export class UserEntity {
  public id: number;
  public user: string;
  public password: string;
  public status: boolean;

  constructor(userId: number, user: string, password: string,status: boolean) {
    this.id = userId;
    this.user = user;
    this.password = password;
    this.status = status;
  }

  static build(
    userId: number,
    user: string,
    password: string,
    status: boolean
  ): UserEntity {
    return new UserEntity(userId, user, password, status);
  }
}
