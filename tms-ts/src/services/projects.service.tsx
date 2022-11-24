import axiosTMS from "./axiosTMS";

export default class ProjectsService {

    static getSuites() {
        return axiosTMS.get("api/v1/suites/")
    }

    static getCases() {
        return axiosTMS.get("api/v1/cases/")
    }

    static getTestPlans() {
        return axiosTMS.get("api/v1/testplans/")
    }

    static getTests() {
        return axiosTMS.get("api/v1/tests/")
    }

    static getUsers() {
        return axiosTMS.get("api/v1/users/")
    }
}