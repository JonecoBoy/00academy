import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export namespace CreateCourseDto {
  export class Body {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsArray()
    @IsOptional()
    students: Array<string>;

    @IsArray()
    @IsOptional()
    lessons: Array<string>;

    @IsString()
    released_at: string;



  }
}
