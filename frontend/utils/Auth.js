export const getAccessToken = () => {
  return sessionStorage.getItem("access");
};
export const getRefreshToken = () => {
  return sessionStorage.getItem("refresh");
};
export const setAccessToken = (value) => {
  sessionStorage.setItem("access", value);
};
export const setRefreshToken = (value) => {
  sessionStorage.setItem("refresh", value);
};
