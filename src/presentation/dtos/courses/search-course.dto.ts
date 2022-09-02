import { IsInt, IsNotEmpty, IsString } from "class-validator";

export namespace SearchCourseDto {
  export class Query {
    @IsInt()
    @IsNotEmpty()
    id: string;
  }
}
