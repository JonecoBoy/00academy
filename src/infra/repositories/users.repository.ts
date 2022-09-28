import {
  UsersRepositoryInterface,
  UsersRespositoryCreateParams,
  UsersRespositorySearchParams,
  UsersRespositoryUpdateParams,
  UsersRespositoryDeleteParams,
} from "../../core/providers/users.repository.interface";
import { id, inject, injectable } from "inversify";
import { UserEntity } from "../../core/entities/user.entity";

import mongoose, { Model, Schema } from 'mongoose';
import {v4 as uuidv4 } from 'uuid';
import { IUserMongoModel, UserMongoModel } from "../models/user.model";
import { UserAdapter } from "../models/user.adapter";
import { BaseAdapter } from "../base.adapter";
import * as dayjs from 'dayjs'
import { ObjectId } from "mongodb";
import { BusinessError } from "../../core/errors/business.error";
import * as sha256 from 'crypto-js/sha256';
import * as aes from 'crypto-js/aes';

@injectable()
export class UsersRepository implements UsersRepositoryInterface {

  private _userModel: Model<IUserMongoModel>;
  private _userAdapter : BaseAdapter<any,any>;

  constructor(
  ){
    this._userModel = UserMongoModel;
    this._userAdapter = new UserAdapter();
  }
  async list () :Promise<Array<UserEntity>>{
    // variavel global na funcao
    let result=[];
    try{
      const data = await this._userModel.find({}).lean().exec();
      data.forEach((item)=>{
        result.push(this._userAdapter.modelToEntity(item));
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


  async create(model: UsersRespositoryCreateParams): Promise<boolean> {
    let addedUser;
    try{
      //todo meter o entity to model ao inves de discretizar tudo.
      const now = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');

      // verificar primeiro se existe o email
      const findUser = await this.searchCustom({email:model.email});
      if(findUser.length>0){
          throw Error('Email already Exists')
      }

      await this._userModel.create(
        {
        admin: model.admin,
        status: model.status,
        email: model.email,
        password: sha256(process.env.PRIVATE_TOKEN+model.password),
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

  async search(model: UsersRespositorySearchParams): Promise<UserEntity> {
    // pesquisa por UUID
    let result=[];
    try{
      const data = await this._userModel.findOne({_id:model.id}).lean().exec();
      if(!data){
        throw new Error(`No User Found.`);
      }
      const result = this._userAdapter.modelToEntity(data);
      
    return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

 async searchCustom(model: any): Promise<Array<UserEntity>> {
    // pesquisa por quaisquer parametros
    let result=[];
    try{

      const data = await this._userModel.find(model).lean().exec();
      data.forEach((item)=>{
        result.push(this._userAdapter.modelToEntity(item));
      })
    
      
    return result;
  }
  catch(error){
    throw new BusinessError(error);
  }
  }

  async searchByEmail(model: UsersRespositorySearchParams): Promise<UserEntity> {
    // deprecated , adicionei o custom search logo nao precisamos mais usar este;
    try{
      const data = await this._userModel.findOne({email:model.email}).lean().exec();
      const result = this._userAdapter.modelToEntity(data)
      return result;
  }
  catch(error){
    throw new BusinessError(error);
  }
  }

  async update(model: UsersRespositoryUpdateParams): Promise<UserEntity> {
    // throw new Error(`Method not implemented.`);
    try{
      // TODO dar um update MANY nos cursos que estiverem no array
      const  {id, ...params} = model;
      const data = await this._userModel.updateOne({_id:new ObjectId(id)},
        {"$set": 
          {...params,
          }
        }).lean().exec();
        if(!data){
          throw new Error(`Error Editing User.`);
        }else{
          if(data.acknowledged == false){
            throw new BusinessError(`Error Editing User.`);
          }else{
            // caso tenha retornado ack como update completo
            const findUpdated = await this._userModel.findOne({uuid:id}).lean().exec();
            const result = this._userAdapter.modelToEntity(findUpdated)
            return result;
          }
        }
        throw new BusinessError(`Error Editing User.`);
      
  }
  catch(error){
    throw new BusinessError(error);
  }
  
  }

  async delete(id: UsersRespositoryDeleteParams): Promise<boolean> {
    // todo add deleted_at para fazer softdelete
    try{
      const data = await this._userModel.deleteOne({_id:id})
      return data.acknowledged;
  }
    catch(error){
    throw new BusinessError(error);
    }
  }

  async getLastId():Promise<any>{
    // pegar ultimo elemento do array, caso o array esteja vazio, alocar como 0
    try{
      const data = await this._userModel.find().sort({created_at: 'desc'}).lean().exec()
    return data;
  }
  catch(error){
    throw new BusinessError(error);
    }
}
}
