import { CourseEntity } from "../../../entities/course.entity";

// todo separar 
export class UpdateCourseUseCaseParams {
  id: string;
  descricao: string;
  status: boolean;
  students?:string[];
}


export interface UpdateCourseInterface {
  execute(model: UpdateCourseUseCaseParams): CourseEntity;
}
