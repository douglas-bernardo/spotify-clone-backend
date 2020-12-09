import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
    email: string;
    nickname: string;
    password: string;
    birthday: string;
    gender: string;
}

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
    },

    nickname:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    birthday:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<User>('User', UserSchema);