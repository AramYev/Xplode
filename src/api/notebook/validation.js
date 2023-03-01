import { body } from 'express-validator';
import * as errMessage from '../../constants/err-messages.js';
import { RAM } from '../../constants/features.js';

export const getOneValidation = () => [];

export const createValidation = () => [
  body('brand')
    .isString().withMessage(errMessage.isNotString),
  body('processor')
    .isString().withMessage(errMessage.isNotString),
  body('video')
    .isString().withMessage(errMessage.isNotString),
  body('RAM')
    .isString().withMessage(errMessage.isNotString)
    .isIn(RAM)
    .withMessage(errMessage.isNotRAM),
];

export const updateValidation = () => [
  body('brand').optional()
    .isString().withMessage(errMessage.isNotString),
  body('processor').optional()
    .isString().withMessage(errMessage.isNotString),
  body('video').optional()
    .isString().withMessage(errMessage.isNotString),
  body('RAM').optional()
    .isString().withMessage(errMessage.isNotString)
    .isIn(RAM)
    .withMessage(errMessage.isNotRAM),
];

export const softDeleteValidation = () => [];
