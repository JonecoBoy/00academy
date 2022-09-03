import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export namespace UpdateCourseDto {
  export class Params {
    @IsString()
    id?: string;
  }

  export class Body {
    @IsOptional()
    @IsString()
    descricao?: string;

    @IsBoolean()
    status?: boolean;
  }
}
