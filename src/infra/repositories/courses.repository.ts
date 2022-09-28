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
import { BaseAdapter } from "../base.adapter";
import { CourseMongoModel, ICourseMongoModel } from "../models/course.model";
import { Model } from "mongoose";
import * as dayjs from 'dayjs'
import { ObjectId } from "mongodb";
import { BusinessError } from "../../core/errors/business.error";
import * as sha256 from 'crypto-js/sha256';
import { CourseAdapter } from "../models/course.adapter";
import { IUserMongoModel } from "../models/user.model";
import TYPES from "../../types";


// todo try catch com as exceptions



@injectable()
export class CourseRepository implements CourseRepositoryInterface {

 private _courseModel: Model<ICourseMongoModel>;
private _courseAdapter : BaseAdapter<any,any>;
private _userModel: Model<IUserMongoModel>;
private _userAdapter : BaseAdapter<any,any>;
private _usersRepository: UsersRepositoryInterface;
constructor(
  @inject(TYPES.UsersRepositoryInterface)
    UsersRepository: UsersRepositoryInterface
  ){
    this._courseModel = CourseMongoModel;
    this._courseAdapter = new CourseAdapter();
    this._usersRepository = UsersRepository;

  }
  async list (): Promise<Array<CourseEntity>>{
    // variavel global na funcao
    let result=[];
    try{
      const data = await this._courseModel.find({}).lean().exec();
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


  async create(model: CourseRespositoryCreateParams): Promise<boolean> {
    let findStudents=[];
    let studentIds=[];
    try{
      //todo meter o entity to model ao inves de discretizar tudo.
      const now = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');

      // verificar primeiro se existe o email
      const findCourse = await this.searchCustom({slug:model.slug});
      if(findCourse.length>0){
          throw Error('Course already Exists')
      }


      if (model.users.length >0){
        //ver se existem estudantes informados
        // todo fazer o mesmo para lessons
        findStudents = await this._usersRepository.searchCustom({ _id: { $in: model.users } });
      }

      // criar um array apenas com os ids
      if(findStudents.length>0){
        studentIds = findStudents.map((item)=>{
          return item.id.toString()
        })
      }

      const ack = await this._courseModel.create(
        {
        name: model.name,
        slug: model.slug,
        status: model.status,
        users: studentIds,
        released_at: dayjs(model.released_at).format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
        updated_at: now,
        created_at: now,
        }
          ,(err,data)=>{
            if(err){
              throw new Error(err.message);
            }else{
            return true
          }
          });
    return true;
    }
    catch(error){
      throw new Error(error);
    }
  }

  async search(model: CourseRespositorySearchParams): Promise<CourseEntity> {
    let result=[];
    try{
      const data = await this._courseModel.findOne({_id:model.id}).lean().exec();
      if(!data){
        throw new Error(`No Course Found.`);
      }
      const result = this._courseAdapter.modelToEntity(data);
      
    return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

  async searchCustom(model: any): Promise<Array<CourseEntity>> {
    // pesquisa por quaisquer parametros
    let result=[];
    try{

      const data = await this._courseModel.find(model).lean().exec();
      data.forEach((item)=>{
        result.push(this._courseAdapter.modelToEntity(item));
      })
    
      
    return result;
  }
  catch(error){
    throw new BusinessError(error);
  }
  }

  async update(model: CourseRespositoryUpdateParams): Promise<CourseEntity> {
    let findStudents=[];
    let studentIds=[];
    try{
      const  {id, ...params} = model;

      //remover duplicatas checar se usuario existe
      //todo meter o entity to model ao inves de discretizar tudo.
      const now = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');

      // verificar primeiro se existe o email
      const findCourse = await this.searchCustom({slug:model.slug});
      if(findCourse.length>0){
          throw Error('Course already Exists')
      }


      if (model.users.length >0){
        //ver se existem estudantes informados
        // todo fazer o mesmo para lessons
        findStudents = await this._usersRepository.searchCustom({ _id: { $in: model.users } });
      }

      // criar um array apenas com os ids
      if(findStudents.length>0){
        studentIds = findStudents.map((item)=>{
          return item.id.toString()
        })
      }
  
      params.users=studentIds;
      // nao ta implementado
      params.lessons=[];

      const data = await this._courseModel.updateOne({_id:new ObjectId(id)},
        {"$set": 
          {...params,
          }
        }).lean().exec();
        if(!data){
          throw new Error(`Error Editing User.`);
        }else{
          if(data.matchedCount<1){
            throw new BusinessError(`Course does not exists.`);
          }else{
            // caso tenha retornado ack como update completo
            const findUpdated = await this._courseModel.findOne({_id:new ObjectId(id)}).lean().exec();
            const result = this._courseAdapter.modelToEntity(findUpdated)
            return result;
          }
        }
        throw new BusinessError(`Error Editing User.`);
      
  }
  catch(error){
    throw new Error(error);
  }
  
  }

  async delete(id: CourseRespositoryDeleteParams): Promise<any> {
    // todo add deleted_at para fazer softdelete
    try{
      const data = await this._courseModel.deleteOne({_id:id})
      if(data.deletedCount >0){
        return data.acknowledged;
      }else{
        return false
      }
  }
    catch(error){
    throw new Error(error);
    }
  }

  async getLastId(): Promise<any>{
    // pegar ultimo elemento do array, caso o array esteja vazio, alocar como 0
    try{
      const data = await this._courseModel.find().sort({created_at: 'desc'}).lean().exec()
    return data;
  }
  catch(error){
    throw new Error(error);
    }
}
}
