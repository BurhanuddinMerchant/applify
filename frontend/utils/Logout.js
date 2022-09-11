export default function Logout() {
  sessionStorage.removeItem("refresh");
  sessionStorage.removeItem("access");
  localStorage.removeItem("userStats");
  sessionStorage.removeItem("yt_access_token");
}
