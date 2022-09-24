import {
  UsersRepositoryInterface,
  UsersRespositoryCreateParams,
  UsersRespositorySearchParams,
  UsersRespositoryUpdateParams,
  UsersRespositoryDeleteParams,
} from "../../core/providers/users.repository.interface";
import { inject, injectable } from "inversify";
import { UserEntity } from "../../core/entities/user.entity";

import mongoose, { Model, Schema } from 'mongoose';
import { UUID } from "bson";
import { IUserMongoModel, UserMongoModel } from "../models/user.model";
import { UserAdapter } from "../models/user.adapter";
import { BaseAdapter } from "../base.adapter";

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


  async create(model: UsersRespositoryCreateParams): Promise<UserEntity> {
    try{
      const data = await this._userModel.create({model});

    return null;
    }
    catch(error){
      throw new Error(error);
    }
  }

  search(model: UsersRespositorySearchParams): Promise<UserEntity> {
    // throw new Error(`Method not implemented.`);
    try{
      
    return null;
  }
  catch(error){
    throw new Error(error);
  }
  }

  async searchByEmail(model: UsersRespositorySearchParams): Promise<UserEntity> {
    // throw new Error(`Method not implemented.`);
    try{
      const data = await this._userModel.findOne({email:model.email}).lean().exec();
      const result = this._userAdapter.modelToEntity(data)
      return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

  update(model: UsersRespositoryUpdateParams): Promise<UserEntity> {
    // throw new Error(`Method not implemented.`);
    try{
      return null;
  }
  catch(error){
    throw new Error(error);
  }
  
  }

  delete(model: UsersRespositoryDeleteParams): any {
    try{
      return null;
  }
    catch(error){
    throw new Error(error);
    }
  }

  getLastId(data:Array<UserEntity>):any{
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
