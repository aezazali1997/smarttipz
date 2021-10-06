import axios from "axios";
export const USER_API_BASE_URL = process.env.BASE_URL;
import { parseCookies } from 'nookies';

class AxiosInstance {

    getUserInfo() {
        const cookie = parseCookies();
        let token = cookie?.token || null;
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

    async changePassword(data) {
        return await axios.put(USER_API_BASE_URL + "api/user/password", data, this.getAuthHeader());
    }

    async resendOTP(data) {
        return await axios.post(USER_API_BASE_URL + "api/user/resend", data);
    }

    async profile() {
        return await axios.get(USER_API_BASE_URL + "api/profile", this.getAuthHeader());
    }

    async getSpecificprofile(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/${username}`, this.getAuthHeader());
    }

    async getFollow() {
        return await axios.get(USER_API_BASE_URL + "api/profile/follow", this.getAuthHeader());
    }

    async getSpecificFollow(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/follow/${username}`, this.getAuthHeader());
    }

    async followUser(username) {
        return await axios.post(USER_API_BASE_URL + "api/profile/set-follows", username, this.getAuthHeader());
    }

    async getVideos() {
        return await axios.get(USER_API_BASE_URL + "api/profile/videos", this.getAuthHeader());
    }
    async getBusinessCard() {
        return await axios.get(USER_API_BASE_URL + "api/profile/businesscard", this.getAuthHeader());
    }

    async getTestimonial() {
        return await axios.get(USER_API_BASE_URL + "api/profile/testimonial", this.getAuthHeader());
    }

    async getSpecificTestimonials(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/testimonial/${username}`, this.getAuthHeader());
    }

    async addTestimonial(data) {
        return await axios.post(USER_API_BASE_URL + "api/profile/testimonial", data, this.getAuthHeader());
    }

    async updateTestimonial(data) {
        return await axios.put(USER_API_BASE_URL + "api/profile/testimonial", data, this.getAuthHeader());
    }

    async deleteTestimonial(id) {
        console.log('In Delete Testiomonial Api');
        return await axios.delete(USER_API_BASE_URL + `api/profile/testimonial/${id}`, this.getAuthHeader());
    }

    async getSpecificBusinessCard(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/businesscard/${username}`, this.getAuthHeader());
    }

    async privateChat(data) {
        return await axios.post(USER_API_BASE_URL + "api/chat/private", data, this.getAuthHeader());
    }

    async threads() {
        return await axios.get(USER_API_BASE_URL + "api/chat/threads", this.getAuthHeader());
    }

    async msgRead(id) {
        return await axios.post(USER_API_BASE_URL + "api/chat/read", id, this.getAuthHeader());
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

    async requestTestimonial(data) {
        console.log('In request Testimonial Api: ', data);
        return await axios.post(USER_API_BASE_URL + "api/profile/testimonial/request", data, this.getAuthHeader());
    }




}

export default new AxiosInstance;