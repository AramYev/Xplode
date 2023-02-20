import { ServiceError } from '../../utils/error-handling';
import {
  getAllRepository, getOneRepository,
  softDeleteRepository,
  createRepository, updateRepository,
} from './repository';
import * as errMessage from '../../constants/err-messages.js';

export const getAllService = async () => getAllRepository();

export const getOneService = async (id) => {
  const gotten = await getOneRepository(id);
  if (!gotten) {
    throw new ServiceError(errMessage.notFound('Notebook'), 404);
  }
  return gotten;
};

export const createService = async (body) => createRepository(body);

export const updateService = async (id, body) => {
  await getOneService(id);
  return updateRepository(id, body);
};

export const softDeleteService = async (id) => {
  await getOneService(id);
  return softDeleteRepository(id);
};
