import axios from "axios";
export const USER_API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

    async getVideoById(id) {
        return await axios.get(USER_API_BASE_URL + `api/profile/videos/Id/${id}`, this.getAuthHeader());
    }

    async getSpecificVideos(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/videos/${username}`, this.getAuthHeader());
    }

    async getNewsFeedPosts() {
        return await axios.get(USER_API_BASE_URL + "api/profile/videos/all-videos", this.getAuthHeader());
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
        return await axios.post(USER_API_BASE_URL + "api/profile/uploadpic", { link: url }, this.getAuthHeader());
    }

    async removeProfilePic() {
        return await axios.delete(USER_API_BASE_URL + "api/profile/deletepic", this.getAuthHeader());
    }

    async requestTestimonial(data) {
        return await axios.post(USER_API_BASE_URL + "api/profile/testimonial/request", data, this.getAuthHeader());
    }

    async uploadMedia(media) {
        return await axios.post(USER_API_BASE_URL + "api/s3-bucket-upload", media);
    }

    async uploadNewsFeed(payload) {
        return await axios.post(USER_API_BASE_URL + "api/profile/upload-video", payload, this.getAuthHeader());
    }

    async getCatalogues() {
        return await axios.get(USER_API_BASE_URL + "api/profile/catalogue", this.getAuthHeader());
    }

    async getSpecificCatalogues(username) {
        return await axios.get(USER_API_BASE_URL + `api/profile/catalogue/${username}`, this.getAuthHeader());
    }

    async getFilteredUserProfiles(search, sort, account) {
        return await axios.post(USER_API_BASE_URL + `api/profile/filter-profile?search=${search}&&sort=${sort}`,
            { accountType: account },
            this.getAuthHeader());
    }

    async getFilteredPosts(search, sort, category, videoType, videoCategory, account, rating,curentPage) {
        return await axios.post(USER_API_BASE_URL + `api/profile/videos/filter-videos?page=${curentPage}&&search=${search}&&sort=${sort}&&category=${category}&&rating=${rating}`,
            { videoType, videoCategory, accountType: account, rating },
            this.getAuthHeader());
    }
    async getFilteredPost(search, sort, category, videoType, videoCategory, account, rating) {
        return await axios.post(USER_API_BASE_URL + `api/profile/videos/filter-video?search=${search}&&sort=${sort}&&category=${category}&&rating=${rating}`,
            { videoType, videoCategory, accountType: account, rating },
            this.getAuthHeader());
    }
    // async getAllFilteredPosts(search, sort, category, videoType, videoCategory, account, rating,curentPage) {
    //     return await axios.post(USER_API_BASE_URL + `api/profile/videos/filter-video-all?page=${curentPage}&&search=${search}&&sort=${sort}&&category=${category}&&rating=${rating}`,
    //         { videoType, videoCategory, accountType: account, rating },
    //         this.getAuthHeader());
    // }

    async likePost(videoId) {
        return await axios.post(USER_API_BASE_URL + "api/profile/videos/like", videoId, this.getAuthHeader());
    }

    async favouritePost(videoId) {
        return await axios.post(USER_API_BASE_URL + "api/profile/videos/favourite", videoId, this.getAuthHeader());
    }

    async sharePost(videoId) {
        return await axios.post(USER_API_BASE_URL + "api/profile/videos/share", videoId, this.getAuthHeader());
    }

    async addToCatalogue(data) {
        return await axios.post(USER_API_BASE_URL + "api/profile/catalogue", data, this.getAuthHeader());
    }

    async deleteVideo(videoId) {
        return await axios.delete(USER_API_BASE_URL + `api/profile/videos?id=${videoId}`, this.getAuthHeader());
    }

    async postComment(payload) {
        return await axios.post(USER_API_BASE_URL + `api/profile/videos/comment`, payload, this.getAuthHeader());
    }
    async deleteCommentById(commentId) {
        return await axios.delete(USER_API_BASE_URL + `api/profile/videos/comment/${commentId}`, this.getAuthHeader());
    }
    async getAllCommentsByVideoId(videoId) {
        return await axios.get(USER_API_BASE_URL + `api/profile/videos/comment?videoId=${videoId}`, this.getAuthHeader());
    }

    async getAllSharedVideos(currentPage) {
        return await axios.get(USER_API_BASE_URL + `api/newsfeed?page=${currentPage}`, this.getAuthHeader());
    }
    async getRelatedVideos() {
        return await axios.get(USER_API_BASE_URL + `api/related-videos`, this.getAuthHeader());
    }

    async ratePost(payload) {
        return await axios.post(USER_API_BASE_URL + `api/profile/videos/rate`, payload, this.getAuthHeader());
    }

}

export default new AxiosInstance;