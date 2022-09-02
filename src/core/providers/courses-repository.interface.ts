import { CourseEntity } from "../entities/course.entity";

export type CourseRespositorySearchParams = {
  id?: number;
};

export type CourseRespositoryCreateParams = {
  dataInicio: string;
  descricao: string;
};

export type CourseRespositoryUpdateParams = {
  id:number;
  descricao?: string;
  status?: string;
};

export interface CourseRepositoryInterface {
  list(model: CourseRespositorySearchParams): CourseEntity[];
  search(model: CourseRespositorySearchParams): CourseEntity;
  create(model: CourseRespositoryCreateParams): CourseEntity;
  update(model: CourseRespositoryUpdateParams): CourseEntity;
}
