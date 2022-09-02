import { CourseEntity } from "../entities/course.entity";

export type CursoRespositorySearchParams = {
  descricao?: string;
};

export type CursoRespositoryCreateParams = {
  dataInicio: string;
  descricao: string;
};

export interface CursoRepositoryInterface {
  search(model: CursoRespositorySearchParams): CourseEntity[];

  create(model: CursoRespositoryCreateParams): CourseEntity;
}
