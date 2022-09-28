import { CourseEntity } from "../../../entities/course.entity";

export class SearchCourseUseCaseParams {
  id: string;
}

export interface SearchCourseInterface {
  execute(model: SearchCourseUseCaseParams): CourseEntity;
}
