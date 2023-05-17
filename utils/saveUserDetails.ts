import Cookies from "js-cookie";

export const saveUserDetails = (userData: {
  isLoggedIn: boolean;
  token: string;
}) => {
  userData.isLoggedIn = true;
  Cookies.set("token", userData.token, { expires: 3 });
  const userObject = JSON.stringify(userData);
  localStorage.setItem("userPayload", userObject);
};
