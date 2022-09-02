import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateCourseInterface,
  CriaCourseUseCaseParams,
} from "./create-course.interface";
import { CourseEntity } from "@core/entities/course.entity";
import TYPES from "../../../../types";

import { CourseRepositoryInterface } from "../../../providers/courses-repository.interface";

@injectable()
export class CriaCourseUseCase implements CreateCourseInterface {
  private _CourseRepository: CourseRepositoryInterface;

  constructor(
    @inject(TYPES.CourseRepositoryInterface)
    CourseRepository: CourseRepositoryInterface
  ) {
    this._CourseRepository = CourseRepository;
  }

  execute(model: CriaCourseUseCaseParams): CourseEntity {
    
    // const CourseFromDb = this._CourseRepository.search({
    //   descricao: model.descricao,
    // });

    // if (!CourseFromDb) throw new Error(``);


    const result = this._CourseRepository.create({
      dataInicio: model.dataInicio,
      descricao: model.descricao,
    });

    return result;
  }
}
