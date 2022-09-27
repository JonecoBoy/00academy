import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";

export namespace CreateCourseDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    dataInicio: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsArray()
    students: Array<string>;

  }
}
