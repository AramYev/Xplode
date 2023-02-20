import {
  getAllService, getOneService,
  updateService, softDeleteService, createService,
} from './service';

export const getAllController = async (req, res, next) => {
  try {
    res.send(await getAllService());
  } catch (err) {
    next(err);
  }
};

export const getOneController = async (req, res, next) => {
  const { id } = req.params;
  try {
    res.send(await getOneService(id));
  } catch (err) {
    next(err);
  }
};

export const createController = async (req, res, next) => {
  try {
    const { body } = req;
    res.send(await createService(body));
  } catch (err) {
    next(err);
  }
};

export const updateController = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    res.send(await updateService(id, body));
  } catch (err) {
    next(err);
  }
};

export const softDeleteController = async (req, res, next) => {
  const { id } = req.params;
  try {
    res.send(await softDeleteService(id));
  } catch (err) {
    next(err);
  }
};
