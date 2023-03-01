import { RepositoryError } from '../../utils/error-handling.js';
import { conn } from '../../index.js';

export const getAllRepository = async () => {
  try {
    const gotten = 'SELECT user_id, username, email, firstName, lastName, age FROM user WHERE deletedAt IS NULL';
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getOneRepository = async (id) => {
  try {
    const gotten = `SELECT user_id, username, email, firstName, lastName, age 
    FROM user WHERE user_id = '${id}' and deletedAt IS NULL`;
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getOneByUsernameRepository = async (username) => {
  try {
    const gotten = `SELECT user_id, username, email, firstName, lastName, age 
    FROM user WHERE username = '${username}'`;
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const getOneByEmailRepository = async (email) => {
  try {
    const gotten = `SELECT user_id, username, email, firstName, lastName, age 
    FROM user WHERE email = '${email}'`;
    return await conn.promise().query(gotten);
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const createRepository = async (body) => {
  const {
    username, email, password, firstName, lastName, age, isEmailVerified,
  } = body;
  try {
    const created = `INSERT INTO user
      (username, email, password, firstName, lastName, age, isEmailVerified)
      VALUES
      ('${username}', '${email}', '${password}', '${firstName}', '${lastName}', '${age}', '${isEmailVerified}')`;
    await conn.promise().query(created);
    const gotten = await getOneByUsernameRepository(username);
    return gotten[0];
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
    const updated = `UPDATE user SET ${set.join(', ')} WHERE user_id = '${id}'`;
    await conn.promise().query(updated);
    const gotten = await getOneRepository(id);
    return gotten[0];
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};

export const softDeleteRepository = async (id) => {
  try {
    const deleted = `UPDATE user SET deletedAt = '${new Date()}' WHERE user_id = '${id}'`;
    await conn.promise().query(deleted);
    return id;
  } catch (err) {
    throw new RepositoryError(err.message, 500);
  }
};
