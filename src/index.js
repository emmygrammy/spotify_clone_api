import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connect_DB.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




