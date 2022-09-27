import { CourseEntity } from "../entities/course.entity";

export type CourseRespositorySearchParams = {
  id?: string;
};

export type CourseRespositoryCreateParams = {
  dataInicio: string;
  descricao: string;
  status: boolean;
  students?:string[];
};

export type CourseRespositoryUpdateParams = {
  id:string;
  descricao?: string;
  status?: boolean;
  students?:string[];
};

export type CourseRespositoryDeleteParams = {
  id: string;
};

export interface CourseRepositoryInterface {
  list(model: CourseRespositorySearchParams): CourseEntity[];
  search(model: CourseRespositorySearchParams): CourseEntity;
  create(model: CourseRespositoryCreateParams): CourseEntity;
  update(model: CourseRespositoryUpdateParams): CourseEntity;
  delete(model: CourseRespositoryDeleteParams): any;
}
