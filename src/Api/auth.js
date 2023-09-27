import axios, { syncToken } from "./url";





export async function login(payload) {
  console.log("Berhasil mengambil data =>")
  return axios.post("/auth/login", payload);
}

export async function registerProses(payload) {
  console.log("Berhasil mengambil data =>")
  return axios.post("/auth/register", payload);
}
export async function forgotPassword(payload) {
  return axios.post("/auth/lupa-password", payload);
}
export async function resetPassword(payload) {
  return axios.post("/auth/reset-password/:id/:token", payload);
}

export async function Dashbord(payload) {
  return axios.post("/dashboard", payload);
}
