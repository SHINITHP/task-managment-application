import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(cors());
app.use(cookieParser()); 
app.use(express.json())

app.use((req, res, next) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
    connectDB();
    console.info(`Server running on port ${PORT}`);
})

