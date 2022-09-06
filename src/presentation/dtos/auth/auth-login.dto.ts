import { IsBoolean, isEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthLoginDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }
}
