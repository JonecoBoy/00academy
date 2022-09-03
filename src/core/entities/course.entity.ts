export class CourseEntity {
  public id: number;
  public descricao: string;
  public dataInicio: string;
  public status: boolean;

  constructor(CourseId: number, descricao: string, dataInicio: string,status: boolean) {
    this.id = CourseId;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.status = status;
  }

  // private getCoursestatus(): string {
  //   return `status_mock`;
  // }

  static build(
    CourseId: number,
    descricao: string,
    dataInicio: string,
    status: boolean
  ): CourseEntity {
    return new CourseEntity(CourseId, descricao, dataInicio, status);
  }
}
