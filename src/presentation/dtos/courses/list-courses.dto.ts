import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace ListCourseDto {
  export class Query {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  }
}
