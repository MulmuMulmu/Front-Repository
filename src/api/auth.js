import { getToken } from './token';

const BASE_URL = 'https://sokksik.click';

export const checkId = async (id) => {
  const response = await fetch(`${BASE_URL}/auth/signup/idCheck?id=${id}`, {
    method: 'GET',
  });
  return await response.json();
};

export const signup = async ({ name, id, password, check_password }) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, id, password, check_password }),
  });
  return await response.json();
};

export const login = async ({ id, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password }),
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  });
  return await response.json();
};

export const deleteAccount = async () => {
  const response = await fetch(`${BASE_URL}/auth/deletion`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  });
  return await response.json();
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await fetch(`${BASE_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return await response.json();
};
