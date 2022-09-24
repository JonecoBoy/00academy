import { UserEntity } from "../../core/entities/user.entity";
import { BaseAdapter } from "../base.adapter";
import { IUserMongoModel } from "./user.model";

export class UserAdapter implements BaseAdapter<IUserMongoModel,UserEntity>{

constructor(){
}


public entityToModel = (entity:UserEntity):IUserMongoModel=>{
    return {
        uuid: entity.id,
        email:entity.email,
        password:entity.password,
        status: entity.status,
        admin: entity.admin,
        updated_at: entity.updated_at,
        created_at: entity.created_at
    }
   
}

public modelToEntity = (model:IUserMongoModel):any=>{
    return new UserEntity(
        model.uuid,
        model.email,
        model.password,
        model.admin,
        model.status,
        model.updated_at,
        model.created_at
    );
}


}