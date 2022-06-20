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
});

app.post('/tweets', (req,res)=>{
    tweets.push(req.body);
    res.send('OK');
});

function generateTweetsToSend(){
    return tweets.map(tweet=>{
        const userSearched=users.find(user=>user.username===tweet.username);
        return {...tweet,avatar:userSearched.avatar}
    })
}

app.get('/tweets', (req,res)=>{
    const newTweets=generateTweetsToSend();
    if(newTweets.length<=10){
        res.send(newTweets.reverse());
    }
    const tweetsReversed=newTweets.reverse();
    res.send(tweetsReversed.slice(0,10));
})

app.listen(5000,()=>console.log("Servidor rodou!"));

