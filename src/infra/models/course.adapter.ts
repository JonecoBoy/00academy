import { CourseEntity } from "../../core/entities/course.entity";
import { BaseAdapter } from "../base.adapter";
import { ICourseMongoModel } from "./course.model";

export class CourseAdapter implements BaseAdapter<ICourseMongoModel,CourseEntity>{

constructor(){
}


public entityToModel = (entity:CourseEntity):ICourseMongoModel=>{
    return {
        _id: entity.id,
        name:entity.name,
        slug:entity.slug,
        status: entity.status,
        users: entity.students,
        lessons: entity.lessons,
        released_at: entity.released_at,
        updated_at: entity.updated_at,
        created_at: entity.created_at
    }
   
}

public modelToEntity = (model:ICourseMongoModel):any=>{
    return new CourseEntity(
        model._id,
        model.name,
        model.slug,
        model.status,
        model.users,
        model.lessons,
        model.released_at,
        model.updated_at,
        model.created_at
    );
}


}