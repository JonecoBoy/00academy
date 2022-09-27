import { CourseEntity } from "@core/entities/course.entity";

export class SearchCourseUseCaseParams {
  id: string;
}

export interface SearchCourseInterface {
  execute(model: SearchCourseUseCaseParams): CourseEntity;
}
