import Cookies from "js-cookie";



export const logOutUser = () => {
  localStorage.clear();
  Cookies.remove("token");
};
