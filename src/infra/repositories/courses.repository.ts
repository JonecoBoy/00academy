import {
  CursoRepositoryInterface,
  CursoRespositoryCreateParams,
  CursoRespositorySearchParams,
} from "../../core/providers/courses-repository.interface";
import { injectable } from "inversify";
import { CourseEntity } from "../../core/entities/course.entity";

const data = [];

@injectable()
export class CursoRepository implements CursoRepositoryInterface {
  create(model: CursoRespositoryCreateParams): CourseEntity {
    // todo: construir o id
    const id = 0;

    // todo: construir data model
    const dataModel = {
      id,
      curso_data_inicio: model.dataInicio,
      curso_descricao: model.descricao,
    };

    // todo: persistir na base de dados
    data.push(dataModel);

    return CourseEntity.build(
      dataModel.id,
      dataModel.curso_descricao,
      dataModel.curso_data_inicio
    );
  }

  search(model: CursoRespositorySearchParams): CourseEntity[] {
    throw new Error(`Method not implemented.`);
  }
}
