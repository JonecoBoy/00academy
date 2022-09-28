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
  list(model: CourseRespositorySearchParams): Promise<Array<CourseEntity>>;
  search(model: CourseRespositorySearchParams): Promise<CourseEntity>;
  create(model: CourseRespositoryCreateParams): Promise<CourseEntity>;
  update(model: CourseRespositoryUpdateParams): Promise<CourseEntity>;
  delete(model: CourseRespositoryDeleteParams): any;
}
