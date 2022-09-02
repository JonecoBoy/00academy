import {
  CourseRepositoryInterface,
  CourseRespositoryCreateParams,
  CourseRespositorySearchParams,
  CourseRespositoryUpdateParams,
} from "../../core/providers/courses-repository.interface";
import { injectable } from "inversify";
import { CourseEntity } from "../../core/entities/course.entity";
import { SearchCourseUseCaseParams } from "@core/usecases/courses/search-course/search-course.interface";

// todo try catch com as exceptions

const data:Array<CourseEntity> = [
]

@injectable()
export class CourseRepository implements CourseRepositoryInterface {
  list (): Array<CourseEntity>{
    
    return data;
  }


  create(model: CourseRespositoryCreateParams): CourseEntity {
    // pegar o ultimo id na base e add +1
    const id = this.getLastId(data)+1;

    const dataModel = {
      id,
      Course_data_inicio: model.dataInicio,
      Course_descricao: model.descricao,
    };

    const newCourse = CourseEntity.build(
      dataModel.id,
      dataModel.Course_descricao,
      dataModel.Course_data_inicio
    );

    data.push(newCourse)

    return newCourse;
  }

  search(model: CourseRespositorySearchParams): CourseEntity {
    // throw new Error(`Method not implemented.`);
    const id = model.id;
    const result = data.find((a)=>{return a.id==id})
    return result;
  }

  update(model: CourseRespositoryUpdateParams): CourseEntity {
    // throw new Error(`Method not implemented.`);
    const id = model.id;
    data.forEach((result)=>{
      if(result.id == id){
        result.descricao=model.descricao;
        result.status=model.status;
      }

    })

    return this.search({id});
  }

  getLastId(data:Array<CourseEntity>):any{
    // pegar ultimo elemento do array, caso o array esteja vazio, alocar como 0
    if(data.length===0){
      return 0
    }
    return data[data.length-1].id;
  }
}
