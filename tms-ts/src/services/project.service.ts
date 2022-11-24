import axiosTMS from "./axiosTMS";

export default class ProjectService {

    static getProjects() {
        return axiosTMS.get("api/v1/projects/")
    }

    static createProject(project: {name: string, description: string}) {
        return axiosTMS.post("api/v1/projects/", project)
    }
}
