import { Notebook } from './models/model.js';
import { RepositoryError } from '../../utils/error-handling.js';

export const getAllRepository = async () => {
  try {
    return await Notebook.find().where({ deletedAt: undefined });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getOneRepository = async (id) => {
  try {
    return await Notebook.findOne({ _id: id });
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createRepository = async (body) => {
  try {
    const created = new Notebook({ ...body, updatedAt: new Date() });
    return await created.save();
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateRepository = async (id, body) => {
  try {
    return await Notebook.updateOne({ _id: id }, { updatedAt: new Date() }, body);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const softDeleteRepository = async (id) => {
  try {
    await Notebook.updateOne({ _id: id }, { deletedAt: new Date() });
    return { id };
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
