import { sign, verify } from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Use a secure key in production

export const generateToken = (payload) => {
  return sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};
