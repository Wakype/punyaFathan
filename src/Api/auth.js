import axios,{ syncToken } from "./url";



export async function login(payload) {
    return axios.post("/auth/login", payload);
  } 

  export async function registerProses(payload){
    return axios.post("/auth/register",payload)
}
export async function ForgotPassword(payload){
  return axios.post("/auth/forgotPassword",payload)
}

export async function Dashbord(payload){
  return axios.post("/dashboard",payload)
}