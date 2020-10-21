import { Document, Schema, Model, model } from 'mongoose';

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

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    lastname: string;
    role: number;
    token: string;
    tokenExp: number;
}
export const User: Model<IUser> = model<IUser>('User', UserSchema);