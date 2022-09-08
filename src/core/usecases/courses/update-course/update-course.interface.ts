import { CourseEntity } from "@core/entities/course.entity";
import { UserEntity } from "@core/entities/user.entity";

// todo separar 
export class UpdateCourseUseCaseParams {
  id: number;
  descricao: string;
  status: boolean;
  students?:UserEntity[];
}


export interface UpdateCourseInterface {
  execute(model: UpdateCourseUseCaseParams): CourseEntity;
}
