import { body, param } from 'express-validator';
import * as errMessage from '../../constants/err-messages.js';
import { RAM } from '../../constants/features.js';

export const getOneValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
};

export const createValidation = () => {
  body('brand')
    .isString().withMessage(errMessage.isNotString);
  body('processor')
    .isString().withMessage(errMessage.isNotString);
  body('video')
    .isString().withMessage(errMessage.isNotString);
  body('RAM')
    .isString().withMessage(errMessage.isNotString)
    .isIn(RAM)
    .withMessage(errMessage.isNotRAM);
};

export const updateValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
  body('brand').optional()
    .isString().withMessage(errMessage.isNotString);
  body('processor').optional()
    .isString().withMessage(errMessage.isNotString);
  body('video').optional()
    .isString().withMessage(errMessage.isNotString);
  body('RAM').optional()
    .isString().withMessage(errMessage.isNotString)
    .isIn(RAM)
    .withMessage(errMessage.isNotRAM);
};

export const softDeleteValidation = () => {
  param('id').isMongoId().withMessage(errMessage.isNotMongoId);
};
