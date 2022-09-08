import { CourseEntity } from "@core/entities/course.entity";
import { UserEntity } from "@core/entities/user.entity";

export class CreateCourseUseCaseParams {
  descricao: string;
  dataInicio: string;
  status: boolean;
  students?: UserEntity[];
}

export interface CreateCourseInterface {
  execute(model: CreateCourseUseCaseParams): CourseEntity;
}
