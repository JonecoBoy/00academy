import {
  CourseRepositoryInterface,
  CourseRespositoryCreateParams,
  CourseRespositorySearchParams,
  CourseRespositoryUpdateParams,
  CourseRespositoryDeleteParams,
} from "../../core/providers/courses-repository.interface";
import {UsersRepositoryInterface} from "../../core/providers/users.repository.interface"
import { inject, injectable } from "inversify";
import { CourseEntity } from "../../core/entities/course.entity";
import { UsersRepository, } from "./users.repository";
import TYPES from "src/types";
import { ListUsersUseCase } from "@core/usecases/users/list-users/list-users.usecase";


// todo try catch com as exceptions

let data:Array<CourseEntity> = [
]

@injectable()
export class CourseRepository implements CourseRepositoryInterface {

  _usersRepository = new UsersRepository();
  list (): Array<CourseEntity>{
    try{
      if(!data){
        throw new Error(`The course list is empty.`)
      }
      return data;
    }
    catch(error){
      throw new Error(error);
    }
    
  }


  create(model: CourseRespositoryCreateParams): CourseEntity {
    // pegar o ultimo id na base e add +1
    const id = this.getLastId(data)+1;

    
    // todo verificar se ja existe o nome do curso em questao e mandar throw new Error
  
    let studentsArray =[];
    // verificar se os usuarios existem
    model.students.forEach((id)=>{
      let model = {id:id}
      let student = this._usersRepository.search(model)
      if(student){
      studentsArray.push(student);
      }
    })
    

    
    const dataModel = {
      id,
      dataInicio: model.dataInicio,
      descricao: model.descricao,
      status: model.status,
      students: studentsArray,
    };

    const newCourse = CourseEntity.build(
      dataModel.id,
      dataModel.descricao,
      dataModel.dataInicio,
      dataModel.status,
      dataModel.students
    );

    data.push(newCourse)

    return newCourse;
  }

  search(model: CourseRespositorySearchParams): CourseEntity {
    // throw new Error(`Method not implemented.`);
    try{
    const id = model.id;
    const result = data.find((a)=>{return a.id==id})
    if(!result){
      throw new Error(`This Course does not exists.`);
    }
    return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

  update(model: CourseRespositoryUpdateParams): CourseEntity {
    // throw new Error(`Method not implemented.`);
    try{
    const id = model.id;
    data.forEach((result)=>{
      if(result.id == id){
        result.descricao=model.descricao;
        result.status=model.status;
        if(model.students){
        let studentsArray =[];

        model.students.forEach((id)=>{
          let student = this._usersRepository.search({id:id})
          if(student){
          studentsArray.push(student);
          }
        })
        result.students = studentsArray;
      }
      }

    })
    return this.search({id});
  }
  catch(error){
    throw new Error(error);
  }
  
  }

  delete(model: CourseRespositoryDeleteParams): any {
    try{
      // verificar se existe o curso
      const result = this.search(model);
        if(result){
      var courseid = model.id;
      data = data.filter((entity,id)=>{
        return (entity.id != courseid)
      })
      return true
    }
  }
    catch(error){
    throw new Error(error);
    }
  }

  getLastId(data:Array<CourseEntity>):any{
    // pegar ultimo elemento do array, caso o array esteja vazio, alocar como 0
    try{
    if(data.length===0){
      return 0
    }
    return data[data.length-1].id;
  }
  catch(error){
    throw new Error(error);
    }
}
}
