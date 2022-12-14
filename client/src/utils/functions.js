export const rememberUserOnLocaleStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocaleStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const removeUserFromLocaleStorage = () => {
  localStorage.removeItem("user");
};
