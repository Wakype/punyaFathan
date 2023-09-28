import axios from "./url";

export async function getAllProduk() {
    return axios.get(`/barang/list`)
}

export async function createProduk(payload) {
    return axios.post(`/barang/create`,payload)
}

export async function updateProduk(id) {
    return axios.put(`/barang/update/${id}`)
}
export async function deleteProduk(id) {
    return axios.delete(`/barang/delete/${id}`)
}
