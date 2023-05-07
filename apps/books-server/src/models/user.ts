import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

const userSchema = new mongoose.Schema(
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
    },
    {
        toJSON: {
            transform(doc, ret) {
                (ret.id = ret._id),
                    delete ret._id,
                    delete ret.password,
                    delete ret.__v;
            },
        },
    }
);

userSchema.pre('save', async function () {
    if (
        this.isModified('password') &&
        this.isModified('passwordConfirmation')
    ) {
        const hashed = Password.toHash(
            this.get('password') && this.get('passwordConfirmation')
        );
        this.set('password', hashed) &&
            this.set('passwordConfirmation', hashed);
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };
