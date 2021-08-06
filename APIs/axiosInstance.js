import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;

class AxiosInstance {
    async signup(payload) {
        console.log('In signup API')
        console.log(USER_API_BASE_URL)
        return await axios.post(USER_API_BASE_URL + "api/user/signup", payload);
    }

    async login(credentials) {
        return await axios.post(USER_API_BASE_URL + "api/user/signin", credentials);
    }

    async authenticate(payload) {
        return await axios.post(USER_API_BASE_URL + "api/user/authenticate", payload);
    }

    async forgetPassword(email) {
        return await axios.post(USER_API_BASE_URL + "api/user/forgot", { email });
    }

    async resendOTP(username) {
        return await axios.post(USER_API_BASE_URL + "api/user/resend", { username });
    }

    getUserInfo() {
        return localStorage.getItem("token");
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

}

export default new AxiosInstance;