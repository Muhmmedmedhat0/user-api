import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import CustomError from '../helpers/error';
import { UserDocument } from '../types/user.types';
const JWT_SECRET = process.env.JWT_SECRET as string;

import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult, Result, ValidationError } from 'express-validator';

// rigister a new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { firstName, lastName, email, password, marketingConsent } = req.body;

  try {
    // adding validation to the request body
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation Error, Enterd data is incorrect',
        errors: errors.array(),
      });
    }

    // check if user already exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({
        message: 'This Email already exists tray to login ;)',
      });
    }

    // hash the password before saving it to the database
    const hashedPassword = await bycript.hash(password, 12);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      marketingConsent: marketingConsent,
    });

    // save the user to the database
    user.save();

    // send id and token to user
    const token = jwt.sign({ id: user._id , firstName: user.firstName}, JWT_SECRET, { expiresIn: '1h' });
    const userData: UserDocument = user.toObject();
    const { _id } = userData;

    return res.status(201).json({
      id: _id,
      token: token,
    });
  } catch (error) {
    const customError = new CustomError('Internal Server Error', 500);
    next(customError);
  }
};

// login
export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    // adding validation to the request body
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation Error, Enterd data is incorrect',
        errors: errors.array(),
      });
    }

    // check if user dose not exist
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        message: 'This Email dose not exists tray to rigister first ;)',
      });
    }

    // compare password
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({
        message: 'Wrong password',
      });
    }

    // send id and token to user
    const token = jwt.sign({ id: user._id , firstName: user.firstName}, JWT_SECRET, { expiresIn: '1h' });
    const userData: UserDocument = user.toObject();
    const { _id } = userData;

    return res.status(201).json({
      id: _id,
      token: token,
    });
  } catch (error) {
    const customError = new CustomError('Internal Server Error', 500);
    next(customError);
  }
}
