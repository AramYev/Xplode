import { Router } from 'express';
import { expressValidationResult } from '../../utils/middleware-utils.js';
import {
  signupController, getOneController,
  updateController, softDeleteController,
} from './controller.js';
import { getOneValidation, softDeleteValidation, updateValidation } from './validation.js';

const router = Router();

router.post('/signup', signupController);
router.post('/signin', getOneValidation(), expressValidationResult, getOneController);

export default router;
