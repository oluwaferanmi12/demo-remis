export const extractCookie = (tokenWrap: string) => {
  if (tokenWrap && tokenWrap.includes("=")) {
    return tokenWrap.split("=")[1].trim();
  }
  return "";
};
