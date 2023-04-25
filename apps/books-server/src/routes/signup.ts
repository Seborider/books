import express, { Request, Response, NextFunction } from "express";
import { User } from '../models/user'
const router = express.Router();

router.post(
  "/api/users/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return next(new Error('Email in use'));
    }
    
    const user = User.build({
      username,
      password,
    })
    await user.save();
    res.status(201).send({ user })
  }
);

export { router as signupRouter };
