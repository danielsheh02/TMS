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
    project: number;
    test_results: testResult[];
    current_result: testResult;
    user: number;
    is_archive: boolean;
    updated_at?: string;
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

export interface user {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    username: string;
}