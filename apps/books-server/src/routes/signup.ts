import express, { Request, Response } from 'express';
import { User } from '../models/user';

//create new router object instance
const router = express.Router();

//route handler for post request to '/signup' - endpoint
router.post('/api/users/signup', async (req: Request, res: Response) => {
    // destructure the request body
    const {
        firstName,
        lastName,
        email,
        username,
        password,
        passwordConfirmation,
    } = req.body;

    // create new user
    const user = User.build({
        firstName,
        lastName,
        email,
        username,
        password,
        passwordConfirmation,
    });

    //save new user to database
    await user.save();

    //send response status 201(created) and the user object
    res.status(201).send({ user });
});

//export the router to reuse
export { router as signupRouter };
