import {decode} from 'base-64';

const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = JSON.parse(decode(base64));
  return decoded;
};

export const decryptToken = (token: string) => {
  try {
    const decoded = decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid or expired token');
  }
};
