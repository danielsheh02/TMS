import axios from "axios";
import authHeader from "./Authorization/auth.header";

const API_URL = process.env.REACT_APP_API_URL;

// function getCookie(name: string) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

export default class SuiteCaseService {

    static getSuites() {
        return axios.get(API_URL + "/api/v1/suites/", {headers: authHeader()})
    }

    static getCases() {
        return axios.get(API_URL + "/api/v1/cases/", {headers: authHeader()})
    }

    static getTreeSuites() {
        return axios.get(API_URL + "/api/v1/projects/1/suites/", {headers: authHeader()})
    }

    static createCase(myCase: { name: string; project: number; suite: number; scenario: string; }) {
        axios.post(API_URL + "/api/v1/cases/", myCase, {headers: authHeader()})
            .then(() => {})
    }

    static createSuite(suite: { parent: number | null; name: string }) {
        axios.post(API_URL + "/api/v1/suites/", suite, {headers: authHeader()})
            .then(() => {})
    }
}
