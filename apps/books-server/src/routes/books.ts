import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

// Add one book
router.post(
    '/api/users/books/:book',
    async (req: Request, res: Response, next: NextFunction) => {
        //extract username and password from the request body
        const { title, author, genre, username } = req.body;
        console.log('Received request body:', req.body);

        //check if the user exists and throw error if not
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return next(new Error('User not found'));
        }

        existingUser.books.push({ title, author, genre });
        await existingUser.save();

        //sets the response status to 200 (OK) and sends an empty object
        res.status(200).send({ user: existingUser });
    }
);

// Get all books
router.get('/api/users/books', async (req: Request, res: Response) => {
    const username = req.query.username;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(200).send({ books: existingUser.books });
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a book by title
router.delete(
    '/api/users/books/:username/:title',
    async (req: Request, res: Response) => {
        const { username, title } = req.params;
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).send('User not found');
        }

        existingUser.books = existingUser.books.filter(
            (book) => book.title !== title
        );
        await existingUser.save();

        res.status(200).send({ user: existingUser });
    }
);

// Get a single book by title
router.get('/api/users/books/:title', async (req: Request, res: Response) => {
    const username = req.query.username;
    const { title } = req.params;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        const book = existingUser.books.find((book) => book.title === title);
        res.status(200).send({ book });
    } else {
        res.status(404).send('User not found');
    }
});

// Edit a book by title
router.put(
    '/api/users/books/:username/:title',
    async (req: Request, res: Response) => {
        const { username, title } = req.params;
        const { newTitle, newAuthor, newGenre } = req.body;
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).send('User not found');
        }

        const book = existingUser.books.find((book) => book.title === title);

        if (book) {
            book.title = newTitle;
            book.author = newAuthor;
            book.genre = newGenre;
            await existingUser.save();
            res.status(200).send({ user: existingUser });
        } else {
            res.status(404).send('Book not found');
        }
    }
);

export { router as bookRouter };
