import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config();
const port = process.env.PORT || 5000;

import productRoute from './routes/productRoute.js'

const app = express();
mongoose.set('strictQuery', true)


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected successfully to MongoDB')
    } catch (error) {
        console.log(error);
    }
}

app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}))

app.use("/api/products", productRoute)

app.listen(port , () => {
    connect();
    console.log(`Server running on http://localhost:${port}`)
})
