import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;

class AxiosInstance {
    signup(credentials) {
        console.log('In signup API')
        return axios.post(USER_API_BASE_URL + "/api/user/signup", credentials);
    }

    login(credentials) {
        return axios.post(USER_API_BASE_URL + "/api/user/login", credentials);
    }
    getUserInfo() {
        return localStorage.getItem("token");
    }
    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }



}

export default AxiosInstance;