import mongoose,{Types,Schema,Model,model, Date, Models} from "mongoose";

export interface ICourseMongoModel{
    _id: string,
    name: string,
    slug: string,
    status: boolean,
    lessons:Array<any>,
    users: Array<any>,
    released_at: Date,
    updated_at: Date,
    created_at: Date
}

const CourseSchema = new mongoose.Schema<ICourseMongoModel>({
    name:{type: String, required:true},
    slug:{type: String, required:true},
    status:{type: Boolean, default: false},
    lessons:{type: [], required:false},
    users:{type: [], required:false},
    released_at:{type: String},
    updated_at:{type: String},
    created_at:{type: String},
})

// export default mongoose.model('Users',UserSchema)
export const CourseMongoModel: Model<ICourseMongoModel> = model('courses',CourseSchema);