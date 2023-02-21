import { ServiceError } from '../../utils/error-handling.js';
import {
  getAllRepository, getOneRepository,
  getOneByUsernameRepository, softDeleteRepository,
  createRepository, updateRepository, getOneByEmailRepository,
} from './repository.js';
import {
  emailExists, invalidCreds,
  notFound, usernameExists,
} from '../../constants/err-messages.js';
import { hashPassword } from '../../utils/bcrypt-utils.js';

const existsByUsernameService = async (username) => {
  const exists = await getOneByUsernameRepository(username);
  if (exists) {
    throw new ServiceError(usernameExists, 409);
  }
};

const existsByEmailService = async (email) => {
  const exists = await getOneByEmailRepository(email);
  if (exists) {
    throw new ServiceError(emailExists, 409);
  }
};

export const getAllService = async () => getAllRepository();

export const getOneService = async (id) => {
  const gotten = await getOneRepository(id);
  if (!gotten) {
    throw new ServiceError(notFound('User'), 404);
  }
  return gotten;
};

export const createService = async (body) => {
  const {
    username, email, password, firstName, lastName, age,
  } = body;
  existsByUsernameService(username);
  existsByEmailService(email);
  const hash = await hashPassword(password);
  return createRepository({
    username,
    email,
    password: hash,
    firstName,
    lastName,
    age,
  });
};

export const updateService = async (id, body) => {
  await getOneService(id);
  if (body.username) {
    existsByUsernameService(body.username);
  }
  if (body.email) {
    existsByEmailService(body.email);
  }
  return updateRepository(id, body);
};

export const softDeleteService = async (id) => {
  await getOneService(id);
  return softDeleteRepository(id);
};

export const changePasswordService = async (body, id) => {
  const { oldPassword, newPassword, confirmPassword } = body;
  const user = await getOneService(id);
  if (oldPassword !== user.password) {
    throw new ServiceError(invalidCreds, 401);
  }
  if (newPassword !== confirmPassword) {
    throw new ServiceError(invalidCreds, 401);
  }
  const hash = await hashPassword(newPassword);
  await updateService(user.id, { password: hash });
};
