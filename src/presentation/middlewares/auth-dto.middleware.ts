import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as jwt from 'jsonwebtoken';

export const AuthDtoMiddleware = (authContext: string) => {
  async (req: any, res: any, next: any) => {
    // const output: any = plainToInstance(model, req[httpContext]);
    if(authContext === `bearer`){
      const token = req.headers.authorization.replace('Bearer ','');
    }else{
      throw new Error(`Unexpected Authorization Method`)
    }

    return next();
  };
};
