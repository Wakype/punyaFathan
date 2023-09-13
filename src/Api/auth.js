import axios, { syncToken } from "./url";





export async function loginProses(payload) {
  return axios.post("/auth/register", payload);
}

export async function registerProses(payload) {
  return axios.post("/auth/register", payload);
}
export async function forgotPassword(payload) {
  return axios.post("/auth/lupa-password", payload);
}

export async function Dashbord(payload) {
  return axios.post("/dashboard", payload);
}
