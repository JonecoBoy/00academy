import { UserEntity } from "./user.entity";

export class CourseEntity {
  public id: string;
  public descricao: string;
  public dataInicio: string;
  public status: boolean;
  public students: UserEntity[];

  constructor(CourseId: string, descricao: string, dataInicio: string,status: boolean, students: UserEntity[]) {
    this.id = CourseId;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.status = status;
    this.students = students
  }

  // private getCoursestatus(): string {
  //   return `status_mock`;
  // }

  static build(
    CourseId: string,
    descricao: string,
    dataInicio: string,
    status: boolean,
    students?: UserEntity[]
  ): CourseEntity {
    return new CourseEntity(CourseId, descricao, dataInicio, status,students);
  }
}
