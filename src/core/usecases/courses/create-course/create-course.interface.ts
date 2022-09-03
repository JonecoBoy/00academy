import { CourseEntity } from "@core/entities/course.entity";

export class CriaCourseUseCaseParams {
  descricao: string;
  dataInicio: string;
  status: boolean;
}

export interface CreateCourseInterface {
  execute(model: CriaCourseUseCaseParams): CourseEntity;
}
