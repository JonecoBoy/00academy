import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export namespace CreateUserDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    admin: boolean;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

  }
}
