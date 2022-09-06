import { IsInt, IsNotEmpty, IsString } from "class-validator";

export namespace SearchUserDto {
  export class Query {
    @IsInt()
    @IsNotEmpty()
    id: string;
  }
}
