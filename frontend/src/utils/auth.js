export const setDataToLocalStorage = (data) => {
  const { authToken, username } = data;

  localStorage.setItem("authToken", authToken);
  localStorage.setItem("username", username);
};

export const getDataFromLocalStorage = () => {
  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  const data = {
    authToken: authToken,
    username: username,
  };

  return data;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("image");
};
