import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateCourseInterface,
  CreateCourseUseCaseParams,
} from "./create-course.interface";
import { CourseEntity } from "../../../entities/course.entity";
import TYPES from "../../../../types";

import { CourseRepositoryInterface } from "../../../providers/courses-repository.interface";

@injectable()
export class CreateCourseUseCase implements CreateCourseInterface {
  private _CourseRepository: CourseRepositoryInterface;

  constructor(
    @inject(TYPES.CourseRepositoryInterface)
    CourseRepository: CourseRepositoryInterface
  ) {
    this._CourseRepository = CourseRepository;
  }

  async execute(model: CreateCourseUseCaseParams): Promise<boolean> {
    

    const result = await this._CourseRepository.create({
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
