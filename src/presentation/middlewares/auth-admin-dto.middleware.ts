// import { AuthVerifyUseCase } from "../../core/usecases/auth/verify-auth.usecase";

import * as jwt from 'jsonwebtoken';
import { UsersRepository } from '../../infra/repositories/users.repository';

export const AuthAdminDtoMiddleware = (authContext: string) => {
  const _usersRepository = new UsersRepository();
 return async (req: any, res: any, next: any) => {
    // const output: any = plainToInstance(model, req[httpContext]);
    
    if(authContext === `bearer`){
      if(!req.headers.authorization){
        return res.status(400).json(
          `No Token provided`,
        );
      }
      const token = req.headers.authorization.replace('Bearer ','');
    
      const privateKey = '2215x5as4224sf'

      const auth = jwt.verify(token, privateKey,(err,decoded)=>{
        return decoded

      });
      
      const user = await _usersRepository.searchByEmail(auth);

      
      if(!user.admin){
        return res.status(403).json(
          `Permission Denied`,
        );
      }


      
    }else{
      return res.status(400).json(
        `Unexpected Authorization Method`,
      );
    }

    return next();
  };
};
