import { Schema, Model, model, Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const UserSchema: Schema = new Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role: {
        type:Number,
        default: 0
    },
    token: {
        type:String,
    },
    tokenExp: {
        type: Number
    }
});

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    lastname: string;
    role: number;
    token: string;
    tokenExp: number;
}

UserSchema.pre('save', (next:HookNextFunction)=>{
    const user:IUser = this!;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err:Error, salt:string)=>{
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, (err:Error, hash:string)=>{
                if(err) return next(err);
                user.password = hash;
            })
        })
    }else{
        next();
    }
});

export const User: Model<IUser> = model<IUser>('User', UserSchema);