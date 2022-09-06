import { injectable } from "inversify";
import { UserEntity } from "@core/entities/user.entity";
import { AuthInterface } from "@core/providers/auth.interface";

// todo try catch com as exceptions

// mockando um usuario teste
let data = UserEntity.build(1,process.env.ADMIN_USER,process.env.ADMIN_PASSWORD,true,true);

@injectable()
export class AuthRepository implements AuthInterface {
  login (): UserEntity{
    try{
      if(!data){
        throw new Error(`The Users list is empty.`)
      }
      return data;
    }
    catch(error){
      throw new Error(error);
    }
    
  }
}
