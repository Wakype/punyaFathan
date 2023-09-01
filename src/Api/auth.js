import axios,{ syncToken } from "./url";



export async function login(payload) {
    return axios.post("/login", payload);
  } 

  export async function registerProses(payload){
    return axios.post("/register",payload)
}