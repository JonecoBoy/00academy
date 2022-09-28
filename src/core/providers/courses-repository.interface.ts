import { CourseEntity } from "../entities/course.entity";

export type CourseRespositorySearchParams = {
  id?: string;
};

export type CourseRespositoryCreateParams = {
  name: string;
  slug: string;
  status: boolean;
  users?:string[];
  lessons?:string[];
  released_at?:string;
};

export type CourseRespositoryUpdateParams = {
  id:string;
  name?: string;
  slug?: string;
  status?: boolean;
  users?:string[];
  lessons?:string[];
  released_at?:string;
};

export type CourseRespositoryDeleteParams = {
  id: string;
};

export interface CourseRepositoryInterface {
  list(model: CourseRespositorySearchParams): Promise<Array<CourseEntity>>;
  search(model: CourseRespositorySearchParams): Promise<CourseEntity>;
  create(model: CourseRespositoryCreateParams): Promise<boolean>;
  update(model: CourseRespositoryUpdateParams): Promise<CourseEntity>;
  delete(model: CourseRespositoryDeleteParams): Promise<any>;
}
