import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


export default class AuthService {
    static login(username: string, password: string) {
        return axios
            .post(API_URL + "/api/token/", {username: username, password: password})
            .then((response) => {
                if (response.data.access) {
                    localStorage.setItem("token", response.data.access);
                }
            })
    }
}
