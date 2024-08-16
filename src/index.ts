import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectToDatabase } from './db';
import userRoute from './routes/userRoutes';



dotenv.config();
connectToDatabase()
const app = express();
const port = process.env.PORT || 3000


app.use(express.json());


app.use(cors({
  origin: process.env.CORS_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  
  res.send('This is Cleanpro backend')
  
})
app.use("/api/user", userRoute);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});