import { Router } from 'express';
import { expressValidationResult } from '../../utils/middleware-utils.js';
import {
  getAllController, getOneController,
  updateController, softDeleteController,
} from './controller.js';
import { getOneValidation, softDeleteValidation, updateValidation } from './validation.js';

const router = Router();

router.get('/', getAllController);
router.get('/:id', getOneValidation(), expressValidationResult, getOneController);
router.put('/:id', updateValidation(), expressValidationResult, updateController);
router.delete('/:id', softDeleteValidation(), expressValidationResult, softDeleteController);

export default router;
