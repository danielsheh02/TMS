import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + '/api/profile/';

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

    static authorize() {
        return axios.post("http://localhost:8001/api/token/", {username: "admin", password: "password"})
    }

    static getSuites(token: string) {
        return axios.get("http://localhost:8001/api/v1/suites/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static getCases(token: string) {
        return axios.get("http://localhost:8001/api/v1/cases/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static getTreeSuites(token: string) {
        return axios.get("http://localhost:8001/api/v1/projects/1/suites/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static createCase(myCase: { name: string; project: number; suite: number; scenario: string; }) {
        axios.post("http://localhost:8001/api/token/", {username: "admin", password: "password"}).then((res) => {
            const token = res.data.access;
            axios.post("http://localhost:8001/api/v1/cases/", myCase, {headers: {Authorization: 'Bearer ' + token}})
                .then((response) => console.log(response))
        })
    }

    static createSuite(suite: { parent: number | null; name: string }) {
        axios.post("http://localhost:8001/api/token/", {username: "admin", password: "password"}).then((res) => {
            const token = res.data.access;
            axios.post("http://localhost:8001/api/v1/suites/", suite, {headers: {Authorization: 'Bearer ' + token}})
                .then((response) => console.log(response))
        })
    }
}
