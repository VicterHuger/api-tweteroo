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
    if(req.body.username==="" || req.body.avatar===""){
        res.status(400).send('Todos os campos são obrigatórios!');
    }else{
        users.push(req.body);
        res.status(201).send('OK');
    }
});

app.post('/tweets', (req,res)=>{
    const userName=(req.header('User'));
    const tweet=req.body.tweet;
    if(userName==="" || req.body.tweet===""){
        res.status(400).send('Todos os campos são obrigatórios!');
    }else{ 
        tweets.push({tweet,username:userName});
        res.status(201).send('OK');
    }
});

function generateTweetsToSend(){
    return tweets.map(tweet=>{
        const userSearched=users.find(user=>tweet.username===user.username);
        return {...tweet,avatar:userSearched.avatar}
    }).reverse();
}

app.get('/tweets', (req,res)=>{
    const newTweets=generateTweetsToSend();
    const num=parseInt(req.query.page);
    if(!num){
        if(newTweets.length<=10){
            res.send(newTweets);
        }
        res.send(newTweets.slice(0,10));
    }
    if(num==="" || num<1){
        res.status(400).send("Informe uma página válida!");
    }else{
        const INICIALINTERVALSLICE=10*(num-1);
        const FINALINTERVALSLICE=INICIALINTERVALSLICE+10;
        res.send(newTweets.slice(INICIALINTERVALSLICE,FINALINTERVALSLICE));
    }
});

app.get('/tweets/:userName', (req,res)=>{
    const userName=req.params.userName;
    const newTweets=generateTweetsToSend();
    const userTweets=newTweets.filter(tweet=>tweet.username===userName);
    res.send(userTweets);
})

app.listen(5000,()=>console.log("Servidor rodou!"));

