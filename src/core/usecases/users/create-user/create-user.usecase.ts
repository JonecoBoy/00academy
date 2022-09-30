import "reflect-metadata";
import { inject, injectable } from "inversify";
import {
  CreateUserInterface,
  CreateUserUseCaseParams,
} from "./create-user.interface";
import { UserEntity } from "../../../entities/user.entity";
import TYPES from "../../../../types";

import { UsersRepositoryInterface } from "../../../providers/users.repository.interface";
import { IsUUID } from "class-validator";
import { EmailServiceInterface,SendEmailParams } from "@core/providers/email-service.interface";
import { EmailService } from "src/infra/services/email.service";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  private _UserRepository: UsersRepositoryInterface;
  private _EmailService: EmailServiceInterface

  constructor(
    @inject(TYPES.UsersRepositoryInterface)
    UserRepository: UsersRepositoryInterface,
    @inject(TYPES.EmailServiceInterface)
    EmailService: EmailServiceInterface
  ) {
    this._UserRepository = UserRepository;
    this._EmailService = EmailService;
  }

  async execute(model: CreateUserUseCaseParams): Promise<boolean> {
    // verificar se ja nao existe o email

    try{
    const result = await this._UserRepository.create({
      email: model.email,
      password: model.password,
      admin: model.admin,
      status: model.status,
    });
    
    
    if(result){
      // caso tenha dado certo enviar email

      const htmlContent = `<h1>Ola administrador</h1><p> o usuario model.email acabou de se cadastrar no site</p>`

      const emailParams:SendEmailParams = {
        message: htmlContent,
        subject: "Novo usuário cadastrado",
        fromAddress: process.env.AWS_REGISTERED_EMAIL,
        toAddress: process.env.AWS_REGISTERED_EMAIL
    }
      const response = this._EmailService.send(emailParams)

      return true;
    }
    
  }
  catch(error){
    throw new Error(error);
  }
  }
}
