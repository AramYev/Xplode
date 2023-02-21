import { Router } from 'express';
import { expressValidationResult } from '../../utils/middleware-utils.js';
import {
  signinController, signupController, verifyEmailController,
  forgetPasswordController, recoverPasswordController,
} from './controller.js';
import {
  signinValidation, signupValidation, verifyEmailValidation,
  forgetPasswordValidation, recoverPasswordValidation,
} from './validation.js';

const router = Router();

router.post('/signup', signupValidation(), expressValidationResult, signupController);
router.post('/signin', signinValidation(), expressValidationResult, signinController);
router.post('/verify-email', verifyEmailValidation(), expressValidationResult, verifyEmailController);
router.post('/forget-password', ...forgetPasswordValidation(), expressValidationResult, forgetPasswordController);
router.post('/recover-password', ...recoverPasswordValidation(), expressValidationResult, recoverPasswordController);

export default router;
