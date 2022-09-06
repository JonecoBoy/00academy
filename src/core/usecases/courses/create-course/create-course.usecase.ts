import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateCourseInterface,
  CreateCourseUseCaseParams,
} from "./create-course.interface";
import { CourseEntity } from "@core/entities/course.entity";
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

  execute(model: CreateCourseUseCaseParams): CourseEntity {
    

    const result = this._CourseRepository.create({
      dataInicio: model.dataInicio,
      descricao: model.descricao,
      status: model.status,
    });

    return result;
  }
}
