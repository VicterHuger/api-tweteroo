import express from "express";
import cors from "cors";

const app=express();

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

const users=[];
const tweets=[];

app.post('/sign-up',(req,res)=>{
    users.push(req.body);
    res.send('OK');
    // res.send(user);
});

app.post('/tweets', (req,res)=>{
    tweets.push(req.body);
    res.send('OK');
    //res.send(tweets);
});

app.get('/tweets', (req,res)=>{
    if(tweets.length<=10){
        res.send(tweets);
    }
    res.send(tweets.slice(tweets.length-11,tweets.length-1));
})

app.listen(5000,()=>console.log("Servidor rodou!"));