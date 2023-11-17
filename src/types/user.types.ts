import mongoose, { Document, Schema } from 'mongoose';


export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  marketingConsent: boolean;
  // Other user properties if any
}