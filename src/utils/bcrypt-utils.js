import bcrypt from 'bcrypt';

const { SALT_ROUNDS } = process.env;

export const hashPassword = async (password) => bcrypt.hash(password, Number(SALT_ROUNDS));

export const comparePassword = async (password, hashed) => {
  const compared = await bcrypt.compare(password, hashed);
  if (!compared) {
    throw new Error();
  }
};
