import { NextFunction } from 'express';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';
const router = express.Router();

router.post(
    '/api/auth/users/signin',
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return next(new Error('Invalid credential'));
        }

        const passwordMatch = Password.compare(existingUser.password, password);
        if (!passwordMatch) {
            return next(new Error('Invalid credential'));
        }

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                username: existingUser.username,
            },
            'secret'
        );

        res.status(200).send({ token: userJwt });
    }
);

export { router as signinRouter };
