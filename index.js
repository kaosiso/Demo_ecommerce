import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRouter from './routes/authRouter.js';
import productRoute from './routes/productRoute.js'
import cartRouter from './routes/cartRouter.js'
import connectDB from './DB/connectDB.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());

app.use(cookieParser());

// Connect to MongoDB

connectDB();


// Routes
app.use('/users', userRoutes); 
app.use('/user', authRouter); 
app.use('/user/products', productRoute); 
app.use('/cart', cartRouter); 


// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
