import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import CustomError from '../helpers/error';
import { UserDocument } from '../types/user.types';

// getUser
export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    // check if user dose not exist
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'This Email dose not exists tray to rigister first ;)',
      });
    }

    // Get user from the database
    const userData: UserDocument = user.toObject();
    const { password, marketingConsent, email, ...rest } = userData;

    // If marketingConsent is false, omit the email property
    const dataToSend = marketingConsent ? { ...rest, email } : rest;

    return res.status(200).json({
      message: 'User retrieved successfully!',
      data: dataToSend,
    });
  } catch (error) {
    const customError = new CustomError('Internal Server Error', 500);
    next(customError);
  }
}