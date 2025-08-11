import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connect_DB.js';
import userRouter from './routes/userRoute.js';
import { StatusCodes } from 'http-status-codes';



const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
connectDB();
//?routes
app.use('/api/users', userRouter);



//? error handling midleware
//?404
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: '404 Not Found'
    });
});

// ? Error handler (for thrown errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});


//?server call
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});




