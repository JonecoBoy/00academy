import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace DeleteUserDto {
  export class Params {
    @IsString()
    id: string;
  }

}
