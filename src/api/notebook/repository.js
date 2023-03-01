import { RepositoryError } from '../../utils/error-handling.js';
import { conn } from '../../index.js';

export const getAllRepository = async () => {
  try {
    const gotten = 'SELECT notebook_id, brand, processor, video, ram FROM notebook WHERE deletedAt IS NULL';
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getOneRepository = async (id) => {
  try {
    const gotten = `SELECT notebook_id, brand, processor, video, ram
    FROM notebook WHERE notebook_id = '${id}' and deletedAt IS NULL`;
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createRepository = async (body) => {
  const {
    brand, processor, video, ram,
  } = body;
  try {
    const created = `INSERT INTO notebook (brand, processor, video, ram)
      VALUES ('${brand}', '${processor}', '${video}', '${ram}')`;
    const gotten = await conn.promise().query(created);
    return await getOneRepository(gotten[0].insertId);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const updateRepository = async (id, body) => {
  try {
    const arr = [...Object.keys(body)];
    const arr1 = [...Object.values(body)];
    const set = [];
    for (let i = 0; i < arr.length; i++) {
      set.push(`${arr[i]} = '${arr1[i]}'`);
    }
    const updated = `UPDATE notebook SET ${set.join(', ')} WHERE notebook_id = '${id}'`;
    await conn.promise().query(updated);
    const gotten = await getOneRepository(id);
    return gotten[0];
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const softDeleteRepository = async (id) => {
  try {
    const deleted = `UPDATE notebook SET deletedAt = '${new Date()}' WHERE notebook_id = '${id}'`;
    await conn.promise().query(deleted);
    return id;
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
