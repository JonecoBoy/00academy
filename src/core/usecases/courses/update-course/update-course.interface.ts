import { CourseEntity } from "../../../entities/course.entity";

// todo separar 
export class UpdateCourseUseCaseParams {
  id: string;
  name?: string;
  slug?: string;
  status?: boolean;
  students?:string[];
  lessons?:string[];
  released_at?:string;
}


export interface UpdateCourseInterface {
  execute(model: UpdateCourseUseCaseParams): Promise<CourseEntity>;
}
