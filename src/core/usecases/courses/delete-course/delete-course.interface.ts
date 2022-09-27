import { CourseEntity } from "@core/entities/course.entity";

export class DeleteCourseUseCaseParams {
  id: string;
}

export interface DeleteCourseInterface {
  execute(model: DeleteCourseUseCaseParams): CourseEntity;
}
