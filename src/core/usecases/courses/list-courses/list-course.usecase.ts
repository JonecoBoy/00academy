import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ListCoursesInterface } from "./list-course.interface";
import { BusinessError } from "../../../errors/business.error";
import { CourseRepositoryInterface } from "@core/providers/courses-repository.interface";
import TYPES from "../../../../types";
import { CourseEntity } from "../../../entities/course.entity";

@injectable()
export class ListCoursesUseCase implements ListCoursesInterface {
  private _CourseRepository: CourseRepositoryInterface;

  constructor(
    @inject(TYPES.CourseRepositoryInterface)
    CourseRepository: CourseRepositoryInterface
  ) {
    this._CourseRepository = CourseRepository;
  }
  
  async execute(filter: any): Promise<Array<CourseEntity>> {

    const result = await this._CourseRepository.list({
    });

  return result;
  }
}
