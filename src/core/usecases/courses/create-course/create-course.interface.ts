import { CourseEntity } from "@core/entities/course.entity";

export class CreateCourseUseCaseParams {
  descricao: string;
  dataInicio: string;
  status: boolean;
}

export interface CreateCourseInterface {
  execute(model: CreateCourseUseCaseParams): CourseEntity;
}
