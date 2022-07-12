import axios from "axios";

const usuarioAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default usuarioAxios;