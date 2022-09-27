// import { AuthVerifyUseCase } from "../../core/usecases/auth/verify-auth.usecase";


import * as dayjs from 'dayjs'
import * as jwt from 'jsonwebtoken';
import { UsersRepository } from '../../infra/repositories/users.repository';
import * as sha256 from 'crypto-js/sha256';
import * as aes from 'crypto-js/aes';

export const AuthDtoMiddleware = (authContext: string) => {
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
      
      const privateKey = process.env.PRIVATE_TOKEN
      const tokenExpirationTime = parseInt(process.env.TOKEN_EXPIRATION_TIME);
      let today = dayjs();
      const auth = jwt.verify(token, privateKey,(err,decoded)=>{
        // jwt usa segundo e o dayjs usa ms
        return decoded

      });
  
      if(!auth){
        return res.status(400).json(
          `Invalid Token`,
        );
      }

      const tokenExpiration = dayjs(auth.iat * 1000).add(tokenExpirationTime,'m');
      
      if(tokenExpiration.diff(today, 'ms', true) < 0){
        return res.status(400).json(
          `Token Expired`,
        );
      }

      const data = await _usersRepository.searchCustom(auth);
      const user = data[0];
      if(!user){
        return res.status(400).json(
          `User does not exists`,
        );
      }
      // if(user.password !== sha256(process.env.PRIVATE_TOKEN+auth.password).toString()){
      //     return res.status(400).json(
      //       `Password Not Match`,
      //     );
      // }

    }else{
      return res.status(400).json(
        `Unexpected Authorization Method`,
      );
    }

    return next();
  };
};
