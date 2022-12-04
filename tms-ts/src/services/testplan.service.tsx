import axiosTMS from "./axiosTMS";
import {testPlan} from "../components/models.interfaces";

export default class TestPlanService {

    static getAllTestPlans() {
        return axiosTMS.get("api/v1/testplans/")
    }

    static async getTestPlan(id: number) {
        const testPlanData = await axiosTMS.get("api/v1/testplans/" + id)
        const testPlan: testPlan = testPlanData.data
        for (const i of testPlan.tests) {
            const testResultsData = await this.getAllTestResults(i.id)
            i.test_results = testResultsData.data
        }
        return testPlanData
    }

    static deleteTestPlan(id: number) {
        return axiosTMS.delete("api/v1/testplans/" + id + "/")
    }

    static getTreeTestPlans() {
        return axiosTMS.get("api/v1/projects/1/testplans/")
    }

    static getParameters() {
        return axiosTMS.get("api/v1/parameters/")
    }

    static getAllTestResults(id: number) {
        return axiosTMS.get("api/v1/tests/" + id + "/results/")
    }

    static createTestPlan(testPlan: { name: string, project: number, parent: number | null, test_cases: number[], parameters: number[], started_at: string, due_date: string}) {
        return axiosTMS.post("api/v1/testplans/", testPlan)
    }
}