import { ServiceError } from '../../utils/error-handling.js';
import {
  getAllRepository, getOneRepository, createRepository,
  softDeleteRepository, updateRepository,
} from './repository.js';
import { notFound } from '../../constants/err-messages.js';

export const getAllService = async () => {
  const gotten = await getAllRepository();
  return gotten[0];
};

export const getOneService = async (id) => {
  const gotten = await getOneRepository(id);
  if (!gotten || gotten[0][0] === undefined) {
    throw new ServiceError(notFound('Notebook'), 404);
  }
  return gotten[0];
};

export const createService = async (body) => {
  const created = await createRepository(body);
  return created[0];
};

export const updateService = async (id, body) => {
  await getOneService(id);
  return updateRepository(id, body);
};

export const softDeleteService = async (id) => {
  await getOneService(id);
  return softDeleteRepository(id);
};
