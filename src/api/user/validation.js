import { body } from 'express-validator';
import * as errMessage from '../../constants/err-messages.js';

export const getOneValidation = () => [];

export const updateValidation = () => [
  body('username').optional()
    .isLength({ min: 3, max: 10 }).withMessage(errMessage.fromToString(3, 10)),
  body('age').optional()
    .isInt({ min: 0, max: 120 }).withMessage(errMessage.fromToInteger(0, 120)),
  body('firstName').optional()
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 25 })
    .withMessage(errMessage.fromToString(2, 25)),
  body('lastName').optional()
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 25 })
    .withMessage(errMessage.fromToString(2, 25)),
  body('email').optional()
    .isEmail().withMessage(errMessage.isNotEmail),
  body('password').optional()
    .isLength({ min: 8, max: 20 }).withMessage(errMessage.fromToString(8, 20)),
];

export const softDeleteValidation = () => [];

export const changePasswordValidation = () => [
  body('oldPassword')
    .exists().withMessage(errMessage.required)
    .isLength({ min: 8, max: 20 })
    .withMessage(errMessage.fromToString(8, 20)),
  body('newPassword')
    .exists().withMessage(errMessage.required)
    .isLength({ min: 8, max: 20 })
    .withMessage(errMessage.fromToString(8, 20)),
  body('confirmPassword')
    .exists().withMessage(errMessage.required)
    .isLength({ min: 8, max: 20 })
    .withMessage(errMessage.fromToString(8, 20)),
];
