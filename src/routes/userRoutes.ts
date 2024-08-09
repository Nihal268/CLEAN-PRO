import express from "express";
import {userController} from "../controller/userController";

const userRoute = express.Router();



userRoute.post("/login", (req,res)=>userController.login(req,res));

userRoute.post("/otpLogin", (req,res)=>userController.otpLogin(req,res));

userRoute.post("/userSignup",(req,res)=> userController.userSignup(req,res));

userRoute.post("/itemPage", (req,res)=>userController.itemPage(req,res));

userRoute.post("/cart", (req,res)=>userController.itemPage(req,res));


export default userRoute ;