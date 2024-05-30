const express= require('express')
const app= express();
const cors= require('cors')
const mongoose = require("mongoose");

const User= require('./model/userModel')


const port=3000;


app.use(cors({

}))

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

app.post('/sendData', async (req,res)=>{
    console.log("request recieved")

    const {name,city}=req.body;

    if (!name || !city) {
        return res.status(400).json({"messaege":'Name and city are required'});
      }

      const user = new User({ name, city });
    
      try {
        const result = await user.save();
        res.status(201).json({"message":result});
      } catch (error) {
        res.status(500).json({"error":`Error creating user: + ${error.message}`});
      }


    console.log(city,name)
})

mongoose.connect('mongodb://localhost:27017/dzyrisDB') //we can also explicitly mention localhost as 127.0.0.1
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


app.listen(3000,()=>{
    console.log("server is running")
})
