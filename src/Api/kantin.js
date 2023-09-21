import axios from "./url";

export async function getAllProduk() {
    return axios.get(`/barang/list`)
}