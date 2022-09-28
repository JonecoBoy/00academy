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
import { BaseAdapter } from "../base.adapter";
import { CourseMongoModel, ICourseMongoModel } from "../models/course.model";
import { Model } from "mongoose";
import { CourseAdapter } from "../models/course.adapter";


// todo try catch com as exceptions



@injectable()
export class CourseRepository implements CourseRepositoryInterface {

 private _courseMpdel: Model<ICourseMongoModel>;
private _courseAdapter : BaseAdapter<any,any>;
constructor(
  ){
    this._courseMpdel = CourseMongoModel;
    this._courseAdapter = new CourseAdapter();
  }
  async list (): Promise<Array<CourseEntity>>{
    // variavel global na funcao
    let result=[];
    try{
      const data = await this._courseMpdel.find({}).lean().exec();
      data.forEach((item)=>{
        result.push(this._courseAdapter.modelToEntity(item));
      })
    
      if(!data){
        throw new Error(`The course list is empty.`)
      }
      return result;
  
    }
    catch(error){
      throw new Error(error);
    }
    
  }


  async create(model: CourseRespositoryCreateParams): Promise<CourseEntity> {

    return null;
  }

  async search(model: CourseRespositorySearchParams): Promise<CourseEntity> {
    // throw new Error(`Method not implemented.`);
    try{
   return null
  }
  catch(error){
    throw new Error(error);
  }
  }

  async update(model: CourseRespositoryUpdateParams): Promise<CourseEntity> {
    // throw new Error(`Method not implemented.`);
    try{
    return null
     
  }
  catch(error){
    throw new Error(error);
  }
  
  }

  async delete(model: CourseRespositoryDeleteParams): Promise<any> {
    try{
      return null
  }
    catch(error){
    throw new Error(error);
    }
  }

  async getLastId(data:Array<CourseEntity>): Promise<any>{
    // pegar ultimo elemento do array, caso o array esteja vazio, alocar como 0
    try{
    return null
  }
  catch(error){
    throw new Error(error);
    }
}
}
