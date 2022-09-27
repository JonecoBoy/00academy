import mongoose,{Types,Schema,Model,model, Date, Models} from "mongoose";

export interface IUserMongoModel{
    _id: string,
    email: string,
    password:string,
    status: boolean,
    admin: boolean,
    updated_at: Date,
    created_at: Date
}

const UserSchema = new mongoose.Schema<IUserMongoModel>({
    email:{type: String, required:true},
    password:{type: String, required:true},
    status:{type: Boolean, default: true},
    admin:{type: Boolean, default: false},
    updated_at:{type: String},
    created_at:{type: String},
})

// export default mongoose.model('Users',UserSchema)
export const UserMongoModel: Model<IUserMongoModel> = model('users',UserSchema);