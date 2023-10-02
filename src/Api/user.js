import axios from "./url";


export async function getUser(){
    console.log("Berhasil mengambil data =>")
    return axios.get("user/list")
}

export async function getDetailUser(id){
    console.log("user id =>",id)
    return axios.get(`user/detail/${id}`,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
}

export async function createUser(payload){
    console.log('====================================');
    console.log("berhasil create =>",payload);
    console.log('====================================');
    return axios.post('user/create',payload)
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


