import mongoose from 'mongoose';
import express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { usernameRouter } from './routes/username';
import { updateRouter } from './routes/update';
import { bookRouter } from './routes/books';
import cors from 'cors';

//loading environment variables
dotenv.config();
//initializing the Express application
const app = express();
//specify that the 'Authorization' header should be exposed.
const corsOptions = {
    exposedHeaders: 'Authorization',
};

//registering middleware
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//registering route handlers
app.use(signinRouter);
app.use(signupRouter);
app.use(usernameRouter);
app.use(updateRouter);
app.use(bookRouter);

//catching all other routes and return error if not existing
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    return next(new Error('Invalid route'));
});

//error handling
app.use((err: Error, req: Request, res: Response) => {
    //JSON response containing the error
    res.json({
        message: err.message || 'an unknown error occurred!',
    });
});

//connect to mongoDB
const initializeConfig = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Connected to MongoDb');
    } catch (error) {
        console.log(error);
    }
};

//start the server and initialize connection to mongoDB
app.listen(3000, async () => {
    await initializeConfig();
    console.log('Listening on port 3000!');
});
