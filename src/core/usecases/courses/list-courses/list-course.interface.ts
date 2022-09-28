import { CourseEntity } from "../../../../core/entities/course.entity";

export interface ListCoursesInterface {
  execute(filter: any): Promise<Array<CourseEntity>>;
}
