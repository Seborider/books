import express, { Request, Response } from 'express';
import { User } from '../models/user';

//create new router object instance
const router = express.Router();

//route handler for post request to '/username' - endpoint
router.post('/api/users/username', async (req: Request, res: Response) => {
    try {
        //The username is extracted from the request body
        const { username } = req.body;
        //find the first username that matches the username parameter
        const existingUser = await User.findOne({ username });
        //return a JSON object with key-value pair exists:true  if user exists
        if (existingUser) {
            return res.status(200).json({ exists: true });
        }
        //return a JSON object with key-value pair exists:false  if user doesn't exist
        res.status(200).json({ exists: false });
    } catch (error) {
        res.status(500).send(
            'ooops...something went wrong when finding the username!'
        );
    }
});

//export the router to reuse
export { router as usernameRouter };
