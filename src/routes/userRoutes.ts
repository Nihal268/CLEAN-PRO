import express from "express";
import {userController} from "../controller/userController";

const userRoute = express.Router();



userRoute.post("/login", userController.login);


export default userRoute ;