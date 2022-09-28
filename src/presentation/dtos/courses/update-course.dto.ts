import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export namespace UpdateCourseDto {
  export class Params {
    @IsString()
    id?: string;
  }

  export class Body {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    slug: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsArray()
    @IsOptional()
    students: Array<string>;

    @IsArray()
    @IsOptional()
    lessons: Array<string>;

    @IsString()
    @IsOptional()
    released_at: string;

  }
}
