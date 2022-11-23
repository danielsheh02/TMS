export interface testResult {
    id: number;
    test: number;
    user: number;
    status: string;
    is_archive: boolean;
    test_case_version: number;
}

export interface myCase {
    id: number;
    name: string;
    suite: number;
    scenario: string;
    project: number;
    estimate: number
    url?: string;
}

export interface test {
    id: number;
    case: myCase;
    plan: number;
    test_results: testResult[];
    current_result: testResult;
    user: number;
    is_archive: boolean;
}

export interface testPlan {
    id: number;
    name: string;
    parent?: number;
    tests: test[];
    started_at: string;
    due_date: string;
    project: number;
}