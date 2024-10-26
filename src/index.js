import express from 'express';
const app = express();
import connectDB from './config/connectDB.js';
import http from 'http';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan  from 'morgan'
import userRouter from './routes/userRoutes.js';

dotenv.config()

const port =process.env.PORT
console.log('front',process.env.FRONTEND_URL);

connectDB()
const  server = http.createServer(app);
app.use(morgan('dev'));
// app.use('/uploads', express.static('public/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin:process.env.FRONTEND_URL ,
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
};

app.use(cors(corsOptions))  
app.use('/user',userRouter)

app.use(cors(corsOptions))  
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });