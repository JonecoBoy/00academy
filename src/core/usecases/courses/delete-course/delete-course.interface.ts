import { CourseEntity } from "@core/entities/course.entity";

export class DeleteCourseUseCaseParams {
  id: number;
}

export interface DeleteCourseInterface {
  execute(model: DeleteCourseUseCaseParams): CourseEntity;
}
