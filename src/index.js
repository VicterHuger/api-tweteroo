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
    if(req.body.username==="" || req.body.tweet===""){
        res.status(400).send('Todos os campos são obrigatórios!');
    }else{ 
        tweets.push(req.body);
        res.status(201).send('OK');
    }
});

function generateTweetsToSend(){
    return tweets.map(tweet=>{
        const userSearched=users.find(user=>tweet.username===user.username);
        return {...tweet,avatar:userSearched.avatar}
    });
}

app.get('/tweets', (req,res)=>{
    const newTweets=generateTweetsToSend();
    if(newTweets.length<=10){
        res.send(newTweets.reverse());
    }
    const tweetsReversed=newTweets.reverse();
    res.send(tweetsReversed.slice(0,10));
})

app.get('/tweets/:userName', (req,res)=>{
    const userName=req.params.userName;
    const newTweets=generateTweetsToSend();
    const userTweets=newTweets.filter(tweet=>tweet.username===userName);
    res.send(userTweets.reverse());
})

app.listen(5000,()=>console.log("Servidor rodou!"));

