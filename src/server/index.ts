import express from 'express';
const app = express();
const port = 3000;
import mongoose from 'mongoose';
const uri = 'mongodb+srv://inseop:<password>@cluster0.v2bfu.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log('DB connected'))
        .catch(err=>console.log(err));

app.get('/', (req: express.Request, res: express.Response)=>{
    res.send('Hello World');
});

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})
