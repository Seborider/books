import express, { Request, Response } from 'express';
import { User } from '../models/user';

//create new router object instance
const router = express.Router();

//route handler for post request to '/signup' - endpoint
router.patch('/api/auth/users/update', async (req: Request, res: Response) => {
    try {
        //user is extracted from the request body
        const {
            originalUsername,
            firstName,
            lastName,
            email,
            username,
            password,
            passwordConfirmation,
        } = req.body;

        console.log(originalUsername);

        const user = await User.findOne({ username: originalUsername });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        //update the fields
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.username = username;

        //if there are new password values
        if (password && passwordConfirmation) {
            user.password = password;
            user.passwordConfirmation = passwordConfirmation;
        }

        const updatedUser = await user.save();

        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).send(
            'Oops...something went wrong when updating the user!'
        );
    }
});

//export the router to reuse
export { router as updateRouter };
