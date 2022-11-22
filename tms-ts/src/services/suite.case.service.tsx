import axiosTMS from "./axiosTMS";

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
        return axiosTMS.get("api/v1/suites/")
    }

    static getCases() {
        return axiosTMS.get("api/v1/cases/")
    }

    static getTestPlans() {
        return axiosTMS.get("api/v1/testplans/")
    }

    static getTreeSuites() {
        return axiosTMS.get("api/v1/projects/1/suites/")
    }

    static deleteSuite(idSuite: number) {
        return axiosTMS.delete("api/v1/suites/" + idSuite + "/")
    }

    static createCase(myCase: { name: string; project: number; suite: number; scenario: string; }) {
        return axiosTMS.post("api/v1/cases/", myCase)
    }

    static createSuite(suite: { parent: number | null; name: string }) {
        return axiosTMS.post("api/v1/suites/", suite)
    }
}
