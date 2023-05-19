import express from 'express'
import dotenv from 'dotenv'
const port = process.env.PORT || 5000;
import productRoute from './routes/productRoute.js'

dotenv.config();
const app = express();

app.use("/api/products", productRoute)

app.listen(port , () => console.log(`Server running on http://localhost:${port}`))
