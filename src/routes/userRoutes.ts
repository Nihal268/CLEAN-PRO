import express from "express";
import {userController} from "../controller/userController";

const userRoute = express.Router();



userRoute.post("/login", userController.login);

userRoute.post("/otpLogin", userController.otpLogin);

userRoute.post("/userSignup", userController.userSignup);

userRoute.post("/itemPage", userController.itemPage);

userRoute.post("/cart", userController.itemPage);


export default userRoute ;