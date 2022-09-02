import { CourseEntity } from "@core/entities/course.entity";

export class UpdateCourseUseCaseParams {
  id: number;
  descricao: string;
  status: string;
}
export class UpdateCourseUseCaseBody{
  descricao: string;
  status: string;
}

export interface UpdateCourseInterface {
  execute(model: UpdateCourseUseCaseParams): CourseEntity;
}
