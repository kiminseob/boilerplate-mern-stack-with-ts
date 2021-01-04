import { Schema, Model, model, Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { VerifyOptions } from 'jsonwebtoken';
const saltRounds = 10;

export interface IUserDocument extends Document{
    name: string;
    email: string;
    password: string;
    lastname: string;
    role: number;
    token: string;
    tokenExp: number;
}
export interface IUser extends IUserDocument{
    comparePassword: (plainPassword:string, cb:Function) => Function;
    generateToken: (cb:Function) => Function;
}
export interface IUserModel extends Model<IUser>{
    findByToken: (token:string, cb:Function) => void;
}

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

UserSchema.pre<IUser>('save', function(next:HookNextFunction){
    if(this.isModified('password')){
        bcrypt.genSalt(saltRounds, (err:Error, salt:string)=>{
            if(err) return next(err);
    
            bcrypt.hash(this.password, salt, (err:Error, hash:string)=>{
                if(err) return next(err);
                this.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

UserSchema.methods.comparePassword = function(plainPassword:string, cb:Function){
    bcrypt.compare(plainPassword, this.password, (err:Error, isMatch:boolean)=>{
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

UserSchema.statics.findByToken = function(token:string, cb:Function){
    jwt.verify(token, 'secret', (err:Error | null, decode?:object)=>{
       this.findOne({"_id":decode, "token": token}, (err:Error, user:IUser)=>{
           if(err) return cb(err);
           cb(null, user);
       })
    })
}

export const User:IUserModel = model<IUser, IUserModel>('User', UserSchema);
export default User;