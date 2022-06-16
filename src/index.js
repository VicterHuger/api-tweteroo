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

const user=[];
const tweet=[];

app.post('/sign-up',(req,res)=>{
    user.push(req.body)
    res.send("OK");
    // res.send(user);
});

app.listen(5000,()=>console.log("Servidor rodou!"));