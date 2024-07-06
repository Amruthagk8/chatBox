const express= require("express")
const cors = require("cors")
const Task= require('./Routes/task')
const connectDb = require('./Db/Connect')



const app= express()
require("dotenv").config();

app.use(cors());
app.use(express.json());


  
app.use('/chatbox/c1',Task)


const server =async()=>{
try{
    await connectDb(process.env.MONGO_URL);
    app.listen(process.env.PORT , ()=>{
        console.log(`server started on port ${process.env.PORT} `)
        }) 
}catch(err){
    console.log(err)
}
}

server();