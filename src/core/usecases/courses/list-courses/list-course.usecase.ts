import "reflect-metadata";
import { injectable } from "inversify";
import { ListaCursoInterface } from "./list-course.interface";
import { BusinessError } from "../../../errors/business.error";

@injectable()
export class ListaCursosUseCase implements ListaCursoInterface {
  execute(filter: any): any[] {
    // if (true)
    //     throw new BusinessError('teste middleware use case');

    throw new Error(`ERRO QUALQUER NAO PREVISTO NA APLICAÇÃO`);

    // return [{
    //     id: 1,
    //     descricao: 'teste curso 1',
    //     status: 'inativo'
    // }];
  }
}
