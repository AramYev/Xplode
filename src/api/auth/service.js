import { ServiceError } from '../../utils/error-handling';
import * as errMessage from '../../constants/err-messages.js';
import { createService as userCreateService } from '../user/service.js';

export const signupService = async (body) => {
  const user = userCreateService(body);
  const token = getToken({ id: user.id }, '15m');
};

export const signinService = async () => {

};
