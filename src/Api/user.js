import axios from "./url";


export async function getUser(){
    console.log("Berhasil mengambil data =>")
    return axios.get("user/list")
}

export async function getDetailUser(id){
    return axios.get(`user/detail/${id}`)
}

export async function createUser(payload){
    console.log('====================================');
    console.log("berhasil create =>",payload);
    console.log('====================================');
    return axios.post('auth/register',payload)
}

export async function updateUser(id){
    return axios.put(`user/update/${id}`)
}

export async function deleteUser(id){
    console.log('====================================');
    console.log('id dapet gk?', id);
    console.log('====================================');
    return axios.delete(`user/delete/${id}`)
}


