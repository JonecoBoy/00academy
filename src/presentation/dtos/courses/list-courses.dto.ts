import { IsNotEmpty, IsString } from "class-validator";

export namespace ListCourseDto {
  export class Query {
    @IsString()
    @IsNotEmpty()
    status: string;
  }
}
