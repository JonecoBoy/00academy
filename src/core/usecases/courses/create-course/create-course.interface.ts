import { CourseEntity } from "@core/entities/course.entity";

export class CriaCursoUseCaseParams {
  descricao: string;
  dataInicio: string;
}

export interface CriaCursoInterface {
  execute(model: CriaCursoUseCaseParams): CourseEntity;
}
