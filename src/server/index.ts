import 'module-alias/register';
import express from 'express';
const app = express();
const port = 3000;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import config from '@config/key';

import {User, IUser} from '@model/user'

mongoose.connect(config.mongoURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log('DB connected'))
        .catch((err: any)=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended : true }));
app.use(cookieParser());

app.post('/api/users/register', (req: express.Request, res: express.Response)=>{
    const user: IUser = new User(req.body);
    
    user.save((err: any, userData: IUser)=>{
        if(err) return res.json({success: false, err});
        return res.status(200).json({
            success:true
        });
    });
});

app.get('/', (req: express.Request, res: express.Response)=>{
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})
