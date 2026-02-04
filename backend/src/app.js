const express=require('express');
const app=express();
const users=require('./model/users.model');
const path=require('path');
app.use(express.json());
const cors=require('cors');
app.use(express.static('./public'));
app.use(cors());
app.get('/users',async(req,res)=>{
    const allUsers=await users.find();
    res.status(200).send(allUsers);
});
app.post('/users',async(req,res)=>{
    const {name,email,mobile_n}=req.body;
   const user= await users.create({name,email,mobile_n});
   res.status(201).send(user);
});

app.delete('/users/:id',async(req,res)=>{
    const id=req.params.id;
    const deletedUser=await users.findByIdAndDelete(id);
    res.status(204).send(deletedUser);
});
app.patch('/users/:id',async(req,res)=>{
    const id=req.params.id;
    const {name,email,mobile_n}=req.body;
    const updatedUser=await users.findByIdAndUpdate(id,{name,email,mobile_n},{new:true});
    res.status(201).send(updatedUser);
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports=app;