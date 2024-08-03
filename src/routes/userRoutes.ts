import express from "express";
const userRoute = express();


userRoute.get("/", (req,res)=>{
  res.send('Hello world ')
})




export default userRoute