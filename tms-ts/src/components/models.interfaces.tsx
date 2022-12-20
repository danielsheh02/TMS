export interface testResult {
    id: number;
    project: number,
    status: number;
    test: number;
    user: number;
    comment?: string;
    is_archive: boolean;
    test_case_version: number;
    created_at: string,
    updated_at: string;
    execution_time?: number;
}

export interface myCase {
    id: number;
    name: string;
    suite: number;
    scenario: string;
    project: number;
    estimate: number | null;
    teardown: string;
    setup: string;
    url?: string;
}

export interface test {
    id: number;
    case: myCase;
    plan: number;
    project: number;
    test_results: testResult[];
    current_result: testResult;
    user: number | null;
    is_archive: boolean;
    updated_at?: string;
    created_at: string
}

export interface param {
    id: number,
    data: string,
    group_name: string,
    url?: string;
}

export interface testPlan {
    id: number,
    name: string,
    project: number,
    parent: number | null,
    parameters: number[] | null,
    tests: test[],
    started_at: string,
    due_date: string,
    url: string,
    is_archive: boolean,
    child_test_plans: number[],
    title: string
}

export interface user {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    username: string;
}