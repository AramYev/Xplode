import { jwt } from 'jsonwebtoken';
import { invalidToken } from '../constants/err-messages';
import { UtilsError } from './error-handling';

const { JWT_SECRET } = process.env;

export const getToken = (signData, expiresIn) => {
  try {
    return jwt.sign(signData, JWT_SECRET, { expiresIn });
  } catch (err) {
    throw new UtilsError(invalidToken, 498);
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UtilsError(invalidToken, 498);
  }
};
