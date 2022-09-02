import { IsNotEmpty, IsString } from "class-validator";

export namespace CreateCourseDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    dataInicio: string;

    // @IsString()
    // @IsNotEmpty()
    // status: string;
  }
}
