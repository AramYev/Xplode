import { ServiceError } from '../../utils/error-handling.js';
import {
  emailNotVerified, expiredToken, invalidCreds, notFound,
} from '../../constants/err-messages.js';
import { createService as userCreateService, updateService as userUpdateService } from '../user/service.js';
import { sendEmail } from '../../utils/email-utils.js';
import { decodeToken, getToken } from '../../utils/jwt-utils.js';
import { getOneByEmailRepository } from '../user/repository.js';
import { comparePassword, hashPassword } from '../../utils/bcrypt-utils.js';

export const signupService = async (body) => {
  const user = userCreateService({ ...body, isEmailVerified: false });
  // const token = getToken({ id: user.id }, '15m');
  // await sendEmail(user.email, 'Your verification token', token);
  return user;
};

export const signinService = async (body) => {
  let user;
  try {
    const { email, password } = body;
    user = await getOneByEmailRepository(email);
    await comparePassword(password, user.password);
  } catch (err) {
    throw new ServiceError(invalidCreds, 401);
  }
  if (!user?.isEmailVerified) {
    const token = getToken({ id: user.id }, '15m');
    await sendEmail(user.email, 'Your verification token', token);
    throw new ServiceError(emailNotVerified, 401);
  }
  return getToken({ id: user.id }, '360d');
};

export const verifyEmailService = async (body) => {
  try {
    const { token } = body;
    const decoded = decodeToken(token);
    await userUpdateService(decoded.id, { isEmailVerified: true });
  } catch (err) {
    throw new ServiceError(expiredToken, 401);
  }
};

export const forgetPasswordService = async (body) => {
  let user;
  try {
    const { email } = body;
    user = await getOneByEmailRepository(email);
  } catch (err) {
    throw new ServiceError(notFound('User'), 404);
  }
  try {
    const token = getToken({ id: user.id }, '15m');
    await sendEmail(user.email, 'Your verification token', token);
  } catch (err) {
    throw new ServiceError(invalidCreds, 401);
  }
};

export const recoverPasswordService = async (body) => {
  const { token, newPassword, confirmPassword } = body;
  let decoded;
  try {
    decoded = decodeToken(token);
  } catch (err) {
    throw new ServiceError(expiredToken, 401);
  }
  if (newPassword !== confirmPassword) {
    throw new ServiceError(invalidCreds, 401);
  }
  const hash = await hashPassword(newPassword);
  await userUpdateService(decoded.id, { password: hash });
};
