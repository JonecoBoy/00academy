// import { AuthVerifyUseCase } from "../../core/usecases/auth/verify-auth.usecase";

import * as dayjs from 'dayjs'
import * as jwt from 'jsonwebtoken';

export const AuthDtoMiddleware = (authContext: string) => {
  // const _authVerifyService = new AuthVerifyUseCase();
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
      const tokenExpirationTime = parseInt(process.env.TOKEN_EXPIRATION_TIME);
      let today = dayjs();
      const auth = jwt.verify(token, privateKey,(err,decoded)=>{
        // jwt usa segundo e o dayjs usa ms
        return decoded

      });
      const tokenExpiration = dayjs(auth.iat * 1000).add(tokenExpirationTime,'m');

      if(!auth){
        return res.status(400).json(
          `Invalid Token`,
        );
      }
      
      if(tokenExpiration.diff(today, 'ms', true) < 0){
        return res.status(400).json(
          `Token Expired`,
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
