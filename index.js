import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes.js'
import userRoutes from './routes/user.js'
import commentRoutes from './routes/comment.js'

dotenv.config();

// SET UP SERVER

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json( { limit: "30mb", extended: true } ));
app.use(express.urlencoded( { limit: "30mb", extended: true } ));

// DEFINE ROUTES

app.use('/recipes', recipeRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentRoutes);

// CONNECT TO MONGOOSE

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection
    .on('open', () => console.log(`Connected to Mongo DB`))
    .on('close', () => console.log(`Disconnected from Mongo DB`))
    .on('error', (e) => console.error(e));

// RUN SERVER

app.listen(PORT, () => { console.log(`Server is running on Port: ${PORT}`)} );