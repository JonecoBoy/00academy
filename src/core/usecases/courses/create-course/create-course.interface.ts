import { CourseEntity } from "../../../entities/course.entity";

export class CreateCourseUseCaseParams {
  name: string;
  slug: string;
  status: boolean;
  students?: string[];
  lessons?: string[];
  released_at?: string;
}

export interface CreateCourseInterface {
  execute(model: CreateCourseUseCaseParams): Promise<boolean>;
}
