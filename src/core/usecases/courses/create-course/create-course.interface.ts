import { CourseEntity } from "../../../entities/course.entity";

export class CreateCourseUseCaseParams {
  descricao: string;
  dataInicio: string;
  status: boolean;
  students?: string[];
}

export interface CreateCourseInterface {
  execute(model: CreateCourseUseCaseParams): Promise<CourseEntity>;
}
