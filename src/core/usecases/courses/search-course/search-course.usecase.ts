import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  SearchCourseInterface,
  SearchCourseUseCaseParams,
} from "./search-course.interface";
import { CourseEntity } from "@core/entities/course.entity";
import { BusinessError } from "../../../errors/business.error";
import { CourseRepositoryInterface } from "@core/providers/courses-repository.interface";
import TYPES from "../../../../types";

@injectable()
export class SearchCourseUseCase implements SearchCourseInterface {
  private _CourseRepository: CourseRepositoryInterface;

  constructor(
    @inject(TYPES.CourseRepositoryInterface)
    CourseRepository: CourseRepositoryInterface
  ) {
    this._CourseRepository = CourseRepository;
  }
  
  execute(model: SearchCourseUseCaseParams): any {

    const result = this._CourseRepository.search(model);

  return result;
  }
}
