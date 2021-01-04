import 'module-alias/register';
import express from 'express';
const app = express();
const port = 5000;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import config from '@config/key';

import User, {IUser} from '@model/user';
import { auth } from '@middleware/auth';

mongoose.connect(config.mongoURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(()=>console.log('DB connected'))
        .catch((err: Error)=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(cookieParser());

app.get("/api/users/auth", auth, (req: express.Request, res: express.Response)=>{
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
})

app.post('/api/users/register', (req: express.Request, res: express.Response)=>{
    const user: IUser = new User(req.body);
    
    user.save((err: Error, userData: IUser)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true,
            userData: userData
        });
    });
});

app.post('/api/users/login', (req:express.Request, res: express.Response)=>{
    User.findOne({email: req.body.email}, (err:Error, user:IUser)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        }

        user.comparePassword(req.body.password, (err:Error, isMatch:boolean)=>{
            if(!isMatch){
                return res.json({ loginSuccess: false, message: "wrong password"});
            }

            user.generateToken((err:Error, user:IUser)=>{
                if(err) return res.status(400).send(err);
                return res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true
                    })
            })
        })
    })
})

app.get("/api/users/logout", auth, (req:express.Request, res:express.Response)=>{
    User.findOneAndUpdate({_id: req.user._id, }, {token: ""}, (err, doc)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    });
}) 

app.get('/', (req: express.Request, res: express.Response)=>{
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})
