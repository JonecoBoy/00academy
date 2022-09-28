import { UserEntity } from "./user.entity";
import { Date } from "mongoose";

export class CourseEntity {
  public id: string;
  public name: string;
  public slug: string;
  public status: boolean;
  public students: UserEntity[];
  public lessons: any;
  public released_at: Date;
  public updated_at: Date;
  public created_at: Date;

  constructor(CourseId: string, name: string, slug: string,status:boolean, students: UserEntity[], lessons: any,released_at:Date,updated_at:Date,created_at:Date) {
    this.id = CourseId;
    this.name = name;
    this.slug = slug;
    this.status = status;
    this.students = students
    this.lessons = lessons
    this.released_at = released_at;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }


  static build(
    CourseId: string,
    name: string,
    slug: string,
    status: boolean,
    students?: UserEntity[],
    lessons?: [],
    released_at?: Date,
    updated_at?: Date,
    created_at?: Date
  ): CourseEntity {
    return new CourseEntity(CourseId, name,slug,status,students,lessons,released_at,updated_at,created_at);
  }
}
