import { body, param } from 'express-validator';
import * as errMessage from '../../constants/err-messages.js';

export const getOneValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
};

export const updateValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
  body('username').optional()
    .isLength({ min: 3, max: 10 }.withMessage(errMessage.fromToString(4, 10)));
  body('password').optional()
    .isInt(({ min: 8, max: 20 }.withMessage(errMessage.fromToInteger(8, 20))));
  body('firstName').optional()
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 15 }.withMessage(errMessage.fromToString(2, 15)));
  body('lastName').optional()
    .isAlpha().withMessage(errMessage.onlyLetters)
    .isLength({ min: 2, max: 15 }.withMessage(errMessage.fromToString(2, 15)));
  body('email').optional()
    .isEmail().withMessage(errMessage.isNotEmail);
};

export const softDeleteValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
};
