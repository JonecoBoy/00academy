import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export namespace AuthLoginDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }
}
