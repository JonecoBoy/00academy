import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  UpdateCourseInterface,
  UpdateCourseUseCaseParams,
} from "./update-course.interface";
import { BusinessError } from "../../../errors/business.error";
import { CourseRepositoryInterface } from "@core/providers/courses-repository.interface";
import TYPES from "../../../../types";
import { CourseEntity } from "@core/entities/course.entity";

@injectable()
export class UpdateCourseUseCase implements UpdateCourseInterface {
  private _CourseRepository: CourseRepositoryInterface;

  constructor(
    @inject(TYPES.CourseRepositoryInterface)
    CourseRepository: CourseRepositoryInterface
  ) {
    this._CourseRepository = CourseRepository;
  }
  
  async execute(model: UpdateCourseUseCaseParams): Promise<CourseEntity>  {

        
    const result = await this._CourseRepository.update({
      id: model.id,
      name: model.name,
      slug: model.slug,
      status: model.status,
      users:model.students,
      lessons:model.lessons,
      released_at: model.released_at
    });

  return result;
  }
}
