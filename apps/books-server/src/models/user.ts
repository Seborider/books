import mongoose from 'mongoose';
import { Password } from '../services/password';

//define the expected properties of the user object
interface IUserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

//extend the mongoose.Model interface
interface IUserModel extends mongoose.Model<IUserDocument> {
    //build new user
    build(attributes: IUserAttributes): IUserDocument;
}

interface IBook {
    title: string;
    author: string;
    genre: string;
    id?: string;
}

//extend the mongoose.Document interface
interface IUserDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    books: IBook[];
    removeBookByTitle(title: string): void;
    findBookById(bookId: string): IBook | null;
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
});

//create the user schema by calling the mongoose.Schema constructor
const userSchema = new mongoose.Schema(
    //define the properties of a user document
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordConfirmation: {
            type: String,
            required: true,
        },
        books: [bookSchema],
    },
    //add toJSON method to the schema options that modifies the JSON output of the document
    {
        toJSON: {
            transform(doc, ret) {
                //turn _id to id
                ret.id = ret._id;
                //remove _id, password and __v properties
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

userSchema.methods.findBookById = function (bookId: string) {
    return this.books.id(bookId);
};

userSchema.methods.removeBookById = function (title: string) {
    const book = this.books.title(title);
    if (book) {
        book.remove();
    }
};

//before the document is saved, if password and passwordConfirmation fields are modified, it hashes the password
userSchema.pre('save', async function () {
    if (
        this.isModified('password') &&
        this.isModified('passwordConfirmation')
    ) {
        //call Password.toHash
        const hashed = Password.toHash(
            this.get('password') && this.get('passwordConfirmation')
        );
        //set the same hashed value for password and passwordConfirmation
        this.set('password', hashed) &&
            this.set('passwordConfirmation', hashed);
    }
});

//add a build method to return a new User with IUserAttributes
userSchema.statics.build = (attributes: IUserAttributes) => {
    return new User(attributes);
};

//create a user by calling the mongoose.model function with IUserDocument, IUserModel as types and the userSchema
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

//export the user
export { User };
