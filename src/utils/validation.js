// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, must contain numbers and letters
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const validateUsername = (username) => {
  // 3-20 characters, letters, numbers, and underscores only
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};