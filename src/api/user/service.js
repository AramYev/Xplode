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
  if (exists[0][0]) {
    throw new ServiceError(usernameExists, 409);
  }
};

const existsByEmailService = async (email) => {
  const exists = await getOneByEmailRepository(email);
  if (exists[0][0]) {
    throw new ServiceError(emailExists, 409);
  }
};

export const getAllService = async () => {
  const gotten = await getAllRepository();
  return gotten[0];
};

export const getOneService = async (id) => {
  const gotten = await getOneRepository(id);
  if (!gotten || gotten[0][0] === undefined) {
    throw new ServiceError(notFound('User'), 404);
  }
  return gotten[0];
};

export const createService = async (body) => {
  const {
    username, email, password, firstName, lastName, age, isEmailVerified,
  } = body;
  await existsByUsernameService(username);
  await existsByEmailService(email);
  const hash = await hashPassword(password);
  return createRepository({
    username,
    email,
    password: hash,
    firstName,
    lastName,
    age,
    isEmailVerified,
  });
};

export const updateService = async (id, body) => {
  await getOneService(id);
  if (body.username) {
    await existsByUsernameService(body.username);
  }
  if (body.email) {
    await existsByEmailService(body.email);
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
