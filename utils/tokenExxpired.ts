import { logOutUser } from "./logOutUser";

export const tokenExpired = (e: any) => {
  if (e.response?.status === 400) {
    logOutUser();
    return (window.location.href = "/admin/sign-in");
  }
  return null;
};
