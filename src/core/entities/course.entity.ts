export class CourseEntity {
  public id: number;
  public descricao: string;
  public dataInicio: string;
  public status: string;

  constructor(CourseId: number, descricao: string, dataInicio: string) {
    this.id = CourseId;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.status = this.getCoursestatus();
  }

  private getCoursestatus(): string {
    return `status_mock`;
  }

  static build(
    CourseId: number,
    descricao: string,
    dataInicio: string
  ): CourseEntity {
    return new CourseEntity(CourseId, descricao, dataInicio);
  }
}
