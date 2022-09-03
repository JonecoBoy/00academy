import { CourseEntity } from "@core/entities/course.entity";

// todo separar 
export class UpdateCourseUseCaseParams {
  id: number;
  descricao: string;
  status: boolean;
}
// export class UpdateCourseUseCaseBody{
//   descricao: string;
//   status: boolean;
// }

export interface UpdateCourseInterface {
  execute(model: UpdateCourseUseCaseParams): CourseEntity;
}
