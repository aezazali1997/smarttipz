import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;
import { parseCookies } from 'nookies';

const cookie = parseCookies();

let token = cookie?.token || null;

class AxiosInstance {

    getUserInfo() {
        console.log('token', token);
        return token;
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

    async signup(payload) {
        console.log('In signup API')
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

    async profile() {
        return await axios.get(USER_API_BASE_URL + "api/profile", this.getAuthHeader());
    }

    async uploadProfilePic(img) {
        console.log({ img })
        return await axios.post(USER_API_BASE_URL + "api/profile/uploadpic", img, this.getAuthHeader());
    }


}

export default new AxiosInstance;