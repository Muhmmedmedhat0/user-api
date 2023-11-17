import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../types/user.types';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    marketingConsent: { type: Boolean, required: true  },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
