import { NextFunction } from 'express';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Password } from '../services/password';

//create new router object instance
const router = express.Router();

//route handler for post request to '/signin' - endpoint
router.post(
    '/api/auth/users/signin',
    async (req: Request, res: Response, next: NextFunction) => {
        //extract username and password from the request body
        const { username, password } = req.body;

        //check if the user exists and throw error if not
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return next(new Error('Invalid credential'));
        }

        //check if password is correct and throw error if not
        const isPasswordCorrect = Password.compare(
            existingUser.password,
            password
        );
        if (!isPasswordCorrect) {
            return next(new Error('Invalid credential'));
        }

        //creates a new JWT with the user's id and username
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                username: existingUser.username,
            },
            //sign the token with a secret key
            `${process.env.JWT_SECRET}`
        );

        //set headers for response
        res.setHeader('Authorization', `Bearer ${userJwt}`);

        //sets the response status to 200 (OK) and sends an empty object
        res.status(200).send({ user: existingUser });
    }
);

//export the router to reuse
export { router as signinRouter };
