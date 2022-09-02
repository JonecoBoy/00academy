import { CourseEntity } from "@core/entities/course.entity";

export class SearchCourseUseCaseParams {
  id: number;
}

export interface SearchCourseInterface {
  execute(model: SearchCourseUseCaseParams): CourseEntity;
}
