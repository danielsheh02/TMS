import React, {useEffect, useState} from "react";
import useStyles from "../../styles/styles";
import {Button, Grid} from "@material-ui/core";
import CreationCase from "../testcases/creation.case.component";
import CreationSuite from "../testcases/creation.suite.component";
import TableTestPlans from "./table.testplans.component";
import BarChartComponent from "./bar.chart.component";
import SuiteCaseService from "../../services/suite.case.service";
import TestPlanService from "../../services/testplan.service";
import CreationTestPlan2 from "./creation.testplan";

export interface param {
    id: number,
    data: string,
    group_name: string,
    url?: string;
}

export interface treeTestPlan {
    id: number,
    name: string,
    level: number,
    children: treeTestPlan[],
    title: string;
}

export interface testPlan {
    id: number,
    name: string,
    project: number,
    parent: number | null,
    parameters: param[] | null,
    tests: number[],
    started_at: string,
    due_date: string,
    url: string
}

const TestPlansComponent: React.FC = () => {
    const [showCreationTestPlan, setShowCreationTestPlan] = useState(false)
    const [selected, setSelected] = React.useState<readonly string[]>([])
    const [testPlans, setTestPlans] = useState<testPlan []>([])
    const [treeTestPlans, setTreeTestPlans] = useState<treeTestPlan[]>([])
    const [params, setParams] = useState<param [] | null>(null)
    // const [testPlanFrom, setTestPlanFrom] = useState<{id: number, name: string} | null>(null)


    useEffect(() => {
            TestPlanService.authorize().then((response) => {
                const token = response.data.access
                TestPlanService.getTestPlans(token).then((response) => {
                    setTestPlans(response.data)
                    TestPlanService.getTreeTestPlans(token).then((response) => {
                        const localTreeTestPlans = response.data
                        setTreeTestPlans(localTreeTestPlans)
                        TestPlanService.getParameters(token).then((response) => {
                            const localParams = response.data
                            setParams(localParams)
                        })
                    })
                })
            })
                .catch((e) => {
                    console.log(e);
                });
        }, []
    )

    const handleShowCreationTestPlan = () => setShowCreationTestPlan(true)
    return (
        <Grid container style={{
            marginTop: 0,
            position: "absolute",
            height: "91%",
            width: "100%"
        }}>
            <Grid xs={10} item>

                <TableTestPlans selected={selected} setSelected={setSelected} testPlans={treeTestPlans}/>
            </Grid>
            <Grid xs={2} item style={{
                backgroundColor: "#eeeeee"
            }}>
                <Grid style={{display: "flex", flexDirection: "column"}}>
                    <Grid style={{textAlign: "center",}}>
                        <Button style={{
                            margin: 15,
                            minWidth: "70%",
                            height: "45%",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                        }} onClick={handleShowCreationTestPlan}>Создать тест-план</Button>
                        <CreationTestPlan2 show={showCreationTestPlan} setShow={setShowCreationTestPlan}
                                           testPlans={testPlans} params={params}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TestPlansComponent