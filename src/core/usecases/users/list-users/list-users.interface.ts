export interface ListUsersInterface {
  execute(filter: any): Promise<any[]>;
}
