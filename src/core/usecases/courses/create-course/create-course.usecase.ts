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

  async execute(model: CreateCourseUseCaseParams): Promise<CourseEntity> {
    

    const result = await this._CourseRepository.create({
      dataInicio: model.dataInicio,
      descricao: model.descricao,
      status: model.status,
      students:model.students,
    });

    return result;
  }
}
