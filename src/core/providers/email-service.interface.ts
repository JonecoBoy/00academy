// import { CursoEntity } from "@core/entity/curso.entity";


// export type CursoRespositorySearchParams = {
//     descricao?: string;    
// }


// export type CursoRespositoryCreateParams = {
//     cursoId: string;
//     dataInicio: string;    
//     descricao: string;    
// }


export type SendEmailParams = {
    message: string;
    subject: string;
    fromAddress: string;
    toAddress: string;
}

export interface EmailServiceInterface {
    send(model: SendEmailParams): Promise<void>;
}
