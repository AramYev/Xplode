import { body } from 'express-validator';
import * as errMessage from '../../constants/err-messages.js';

export const signupValidation = () => [
  body('username')
    .isLength({ min: 3, max: 10 }).withMessage(errMessage.fromToString(4, 10)),
  body('age')
    .isInt({ min: 0, max: 120 }).withMessage(errMessage.fromToInteger(0, 120)),
  body('firstName')
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 15 })
    .withMessage(errMessage.fromToString(2, 15)),
  body('lastName')
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 15 })
    .withMessage(errMessage.fromToString(2, 15)),
  body('email')
    .isEmail().withMessage(errMessage.isNotEmail),
  body('password')
    .isLength({ min: 8, max: 20 }).withMessage(errMessage.fromToString(8, 20)),
];

export const signinValidation = () => [
  body('email').isEmail().withMessage(errMessage.isNotEmail),
  body('password').isInt({ min: 8, max: 20 }).withMessage(errMessage.fromToInteger(8, 20)),
];

export const verifyEmailValidation = () => [
  body('token').isJWT().withMessage(errMessage.invalidToken),
];

export const forgetPasswordValidation = () => [
  body('email').isEmail().withMessage(errMessage.isNotEmail),
];

export const recoverPasswordValidation = () => [
  body('token').isJWT().withMessage(errMessage.invalidToken),
  body('newPassword')
    .isLength({ min: 8, max: 20 }).withMessage(errMessage.fromToString(8, 20)),
  body('confirmPassword')
    .isLength({ min: 8, max: 20 }).withMessage(errMessage.fromToString(8, 20)),
];
