import { Schema, Model, model, Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    lastname: string;
    role: number;
    token: string;
    tokenExp: number;
    comparePassword: (plainPassword:string, cb:Function) => void;
    generateToken: (cb:Function) => void;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
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

UserSchema.pre<IUser>('save', function(next:HookNextFunction){
    if(this.isModified('password')){
        bcrypt.genSalt(saltRounds, (err:Error, salt:string)=>{
            if(err) return next(err);
    
            bcrypt.hash(this.password, salt, (err:Error, hash:string)=>{
                if(err) return next(err);
                this.password = hash;
            })
        })
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function(plainPassword:string, cb:Function){
    bcrypt.compare(plainPassword, this.password,(err:Error, isMatch:boolean)=>{
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

UserSchema.methods.generateToken = function(cb:Function) {
    this.token = jwt.sign(this._id.toHexString(), 'secret');
    
    this.save((err:Error, user:IUser)=>{
        if(err) return cb(err);
        cb(null, user);
    })
}

export const User: Model<IUser> = model<IUser>('User', UserSchema);