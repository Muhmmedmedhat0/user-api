import { body } from 'express-validator';

export const registerValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage('First name must be between 8 and 12 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage('Last name must be between 8 and 12 characters'),
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('password')
    .trim()
    .isLength({ min: 8, max: 12 })
    .not()
    .isEmpty()
    .withMessage('Password must be between 8 and 12 characters'),
  body('marketingConsent').isBoolean().withMessage('Invalid marketing consent'),
];

export const loginValidation = [
  body('email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('password').trim().not().isEmpty().withMessage('Password is required'),
];
