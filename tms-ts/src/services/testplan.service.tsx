import axios from "axios";
import authHeader from "./Authorization/auth.header";

const API_URL = process.env.REACT_APP_API_URL;

export default class TestPlanService {

    static getTestPlans() {
        return axios.get(API_URL + "/api/v1/testplans/", {headers: authHeader()})
    }

    static getTestPlan(id: number) {
        return axios.get(API_URL + "/api/v1/testplans/" + id, {headers: authHeader()})
    }

    static getTreeTestPlans() {
        return axios.get(API_URL + "/api/v1/projects/1/testplans/", {headers: authHeader()})
    }

    static getParameters() {
        return axios.get(API_URL + "/api/v1/parameters/", {headers: authHeader()})
    }

    static createTestPlan(testPlan: { name: string, project: number, parent: number | null, tests: number[], parameters: number[] | null, started_at: string, due_date: string }) {
        axios.post(API_URL + "/api/v1/testplans/", testPlan, {headers: authHeader()})
            .then((response) => console.log(response))
    }
}