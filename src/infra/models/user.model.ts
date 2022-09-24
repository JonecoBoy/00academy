import mongoose,{Types,Schema,Model,model, Date, Models} from "mongoose";

export interface IUserMongoModel{
    email:String,
    password:String,
    status: Date,
    admin: Boolean,
    updated_at: Date,
    created_at: Date
}

const UserSchema = new mongoose.Schema<IUserMongoModel>({
    email:{type: String, required:true},
    password:{type: String, required:true},
    status:{type: Boolean, default: true},
    admin:{type: Boolean, default: false},
    updated_at:{type:Date, default:Date.now},
    created_at:{type:Date, default:Date.now},
})

// export default mongoose.model('Users',UserSchema)
export const UserMongoModel: Model<IUserMongoModel> = model('users',UserSchema);