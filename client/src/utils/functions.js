export const rememberUserOnLocaleStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocaleStorage = () => {
  console.log(localStorage.getItem("user"));

  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const removeUserFromLocaleStorage = () => {
  localStorage.removeItem("user");
};
