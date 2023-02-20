import {
  signinService, signupService,
} from './service';

export const signupController = async (req, res, next) => {
  try {
    res.send(await signupService());
  } catch (err) {
    next(err);
  }
};

export const signinController = async (req, res, next) => {
  const { id } = req.params;
  try {
    res.send(await signinService(id));
  } catch (err) {
    next(err);
  }
};
