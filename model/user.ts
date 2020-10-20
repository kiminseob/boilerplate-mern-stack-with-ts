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

interface User extends Document {
    name: string;
    email: string;
    password: string;
    lastname: string;
    role: number;
    token: string;
    tokenExp: number;
}
const UserModel: Model<User> = model<User>('User', UserSchema);

export default UserModel;

