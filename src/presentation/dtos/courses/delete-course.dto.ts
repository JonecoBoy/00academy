import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace DeleteCourseDto {
  export class Params {
    @IsString()
    id: string;
  }

}
