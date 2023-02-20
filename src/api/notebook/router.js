import { Router } from 'express';
import { expressValidationResult } from '../../utils/middleware-utils.js';
import {
  getAllController, getOneController,
  updateController, softDeleteController, createController,
} from './controller.js';
import {
  createValidation, getOneValidation,
  softDeleteValidation, updateValidation,
} from './validation.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getOneValidation(), expressValidationResult, getOneController);
router.post('/', createValidation(), expressValidationResult, createController);
router.put('/:id', updateValidation(), expressValidationResult, updateController);
router.delete('/:id', softDeleteValidation(), expressValidationResult, softDeleteController);

export default router;
