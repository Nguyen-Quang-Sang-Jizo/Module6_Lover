import axios from "axios";

const customAPI = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8181/',
    });

    if (user) {
        api.defaults.headers.common['Authorization'] = `Bearer ${user}`;
    }
    return api;
};

export default customAPI;