import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
const router = express.Router();

router.post(
    '/api/users/username',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username } = req.body;
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(200).json({ exists: true });
            }

            res.status(200).json({ exists: false });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
);

export { router as usernameRouter };
