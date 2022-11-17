import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + '/api/profile/';

export default class TestPlanService {
    static authorize() {
        return axios.post("http://localhost:8001/api/token/", {username: "admin", password: "password"})
    }

    static getTestPlans(token: string) {
        return axios.get("http://localhost:8001/api/v1/testplans/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static getTreeTestPlans(token: string) {
        return axios.get("http://localhost:8001/api/v1/projects/1/testplans/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static getParameters(token: string) {
        return axios.get("http://localhost:8001/api/v1/parameters/", {headers: {Authorization: 'Bearer ' + token}})
    }

    static createTestPlan(testPlan: { name: string, project: number, parent: number | null, tests: number[], parameters: number[] | null, started_at: string, due_date : string}) {
        axios.post("http://localhost:8001/api/token/", {username: "admin", password: "password"}).then((res) => {
            const token = res.data.access;
            axios.post("http://localhost:8001/api/v1/testplans/", testPlan, {headers: {Authorization: 'Bearer ' + token}})
                .then((response) => console.log(response))
        })
    }
}