import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export namespace UpdateUserDto {
  export class Params {
    @IsString()
    id: string;
  }

  export class Body {
    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsBoolean()
    admin?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
  }
}
