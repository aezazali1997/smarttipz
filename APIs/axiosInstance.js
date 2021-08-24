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

    async privateChat(data) {
        return await axios.post(USER_API_BASE_URL + "api/chat/private", data, this.getAuthHeader());
    }

    async threads() {
        return await axios.get(USER_API_BASE_URL + "api/chat/threads", this.getAuthHeader());
    }

    async updateProfile(payload) {
        return await axios.post(USER_API_BASE_URL + "api/profile/update", payload, this.getAuthHeader());
    }

    async uploadProfilePic(url) {
        console.log({ url })
        return await axios.post(USER_API_BASE_URL + "api/profile/uploadpic", { link: url }, this.getAuthHeader());
    }

    async removeProfilePic() {
        console.log('In delete ProfilePic Api')
        return await axios.delete(USER_API_BASE_URL + "api/profile/deletepic", this.getAuthHeader());
    }


}

export default new AxiosInstance;