import {
  UsersRepositoryInterface,
  UsersRespositoryCreateParams,
  UsersRespositorySearchParams,
  UsersRespositoryUpdateParams,
  UsersRespositoryDeleteParams,
} from "../../core/providers/users.repository.interface";
import { injectable } from "inversify";
import { UserEntity } from "../../core/entities/user.entity";



// mockado o user inicial

// todo verificar se ja existe email e nao deixar


let UserMock = UserEntity.build(1,`user@user.com`,`password`,true,true);

let data:Array<UserEntity> = [
]

data.push(UserMock);

@injectable()
export class UsersMockedRepository implements UsersRepositoryInterface {
  constructor(){
    
  }
  list (): Array<UserEntity>{
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


  create(model: UsersRespositoryCreateParams): UserEntity {
    try{
    // pegar o ultimo id na base e add +1
    const id = this.getLastId(data)+1;

    
    // todo verificar se ja existe o nome do curso em questao e mandar throw new Error
  

    const dataModel = {
      id,
      email: model.email,
      password: model.password,
      admin: model.admin,
      status: model.status,
    };

  
    const findUser = this.searchByEmail(dataModel);
    if(findUser){
      throw new Error(`Email Already Registered.`);
    }

    const newUsers = UserEntity.build(
      dataModel.id,
      dataModel.email,
      dataModel.password,
      dataModel.admin,
      dataModel.status
    );

    data.push(newUsers)

    return newUsers;
    }
    catch(error){
      throw new Error(error);
    }
  }

  search(model: UsersRespositorySearchParams): UserEntity {
    // throw new Error(`Method not implemented.`);
    try{
    const id = model.id;
    const result = data.find((a)=>{return a.id==id})
    if(!result){
      return null;
    }
    return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

  searchByEmail(model: UsersRespositorySearchParams): UserEntity {
    // throw new Error(`Method not implemented.`);
    try{
    const email = model.email;
    const result = data.find((a)=>{return a.email==email})
    if(!result){
      return null;
    }
    return result;
  }
  catch(error){
    throw new Error(error);
  }
  }

  update(model: UsersRespositoryUpdateParams): UserEntity {
    // throw new Error(`Method not implemented.`);
    try{
    if(!model.id){
      throw new Error('You must provide a User ID')
    }
    // todo colocar um if is set, para nao nullar tudo
    data.forEach((result)=>{
      if(result.id == model.id){
        if(model.email) result.email=model.email;
        if(model.password) result.password=model.password;
        if(typeof model.admin !== undefined) {result.admin=model.admin};
        if(typeof model.admin !== undefined) {result.status=model.status};
      }

    })
    const id = model.id;
    return this.search({id});
  }
  catch(error){
    throw new Error(error);
  }
  
  }

  delete(model: UsersRespositoryDeleteParams): any {
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
