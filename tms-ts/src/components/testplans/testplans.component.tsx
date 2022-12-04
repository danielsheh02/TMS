import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import TableTestPlans from "./table.testplans.component";
import SuiteCaseService from "../../services/suite.case.service";
import TestPlanService from "../../services/testplan.service";
import CreationTestPlan from "./creation.testplan";
import {
    Table,
    TableBody, TableCell,
    tableCellClasses,
    TableContainer, TableRow,
} from "@mui/material";
import {treeSuite} from "../testcases/suites.component";
import {param, testPlan} from "../models.interfaces";
import TestplanInfo from "./testplan.info";

export interface treeTestPlan {
    id: number,
    name: string,
    level: number,
    children: treeTestPlan[],
    title: string;
}

const bfs = (startTrees: treeTestPlan[], testPlanId: number) => {
    let q: treeTestPlan[] = new Array<treeTestPlan>();

    for (let tree of startTrees) {
        q.push(tree);
        if (tree.id == testPlanId)
            return tree;
    }

    while (q.length > 0) {
        const v = q.shift();
        if (v != undefined) {
            for (let child of v.children) {
                if (child.id == testPlanId)
                    return child;
                q.push(child);
            }
        }
    }
}

const TestplansComponent: React.FC = () => {
    const [showCreationTestPlan, setShowCreationTestPlan] = useState(false)
    const [testPlans, setTestPlans] = useState<testPlan []>([])
    const [testPlansDict, setTestPlansDict] = useState<{ [id: number]: testPlan }>([])
    const [treeTestPlans, setTreeTestPlans] = useState<treeTestPlan[]>([])
    const [params, setParams] = useState<param [] | null>(null)
    const [treeSuites, setTreeSuites] = useState<treeSuite[]>([])
    const [currentTestPlan, setCurrentTestPlan] = useState<testPlan | undefined>()
    const testPlanId = window.location.pathname == "/testplans" ? null : Number(window.location.pathname.slice("/testplans/".length))


    const handleShowCreationTestPlan = () => setShowCreationTestPlan(true)

    useEffect(() => {
            TestPlanService.getAllTestPlans().then((response) => {
                setTestPlans(response.data)
                let dictionary: { [id: number]: testPlan } = Object.fromEntries(response.data.map((x: testPlan) => [x.id, x]));
                setTestPlansDict(dictionary);
                /*for (let i = 0; i< response.data.length; i++){
                    TestPlanService.deleteTestPlan(response.data[i].id).then((r)=> console.log(r))
                }*/
            })
                .catch((e) => {
                    console.log(e);
                });
            if (testPlanId) {
                TestPlanService.getTestPlan(testPlanId).then((response) => {
                    setCurrentTestPlan(response.data)
                })
                    .catch((e) => {
                        console.log(e);
                    });

                // setCurrentTestPlan(testPlansDict[testPlanId])
            }

            TestPlanService.getTreeTestPlans().then((response) => {
                const localTreeTestPlans = response.data;
                // console.log('in fun');

                if (testPlanId) {
                    const testTreeTestPlan = bfs(localTreeTestPlans, testPlanId);
                    if (testTreeTestPlan == undefined) {
                        setTreeTestPlans([]);
                    } else {
                        setTreeTestPlans(testTreeTestPlan.children);
                    }
                } else {
                    setTreeTestPlans(localTreeTestPlans);
                }
            })
                .catch((e) => {
                    console.log(e);
                });
            TestPlanService.getParameters().then((response) => {
                const localParams = response.data
                setParams(localParams)
            })
                .catch((e) => {
                    console.log(e);
                });
            SuiteCaseService.getTreeSuites().then((response) => {
                setTreeSuites(response.data)
            })
                .catch((e) => {
                    console.log(e);
                });
        }, []
    )

    return (
        <Grid container style={{
            marginTop: 0,
            position: "absolute",
            height: "91%",
            width: "100%"
        }}>
            <Grid xs={10} item>
                <Grid style={{justifyContent: "center", display: "flex"}}>
                    <TableContainer style={{maxWidth: "80%", margin: 30, padding: 20}}>
                        <Table size="small" sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none",
                            }
                        }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {currentTestPlan &&
                                        <TestplanInfo currentTestPlan={currentTestPlan}/>}
                                    </TableCell>
                                </TableRow>
                                {treeTestPlans.map((testPlan, index) =>
                                    <TableTestPlans key={index} testplan={testPlan}/>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>

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
                        <CreationTestPlan show={showCreationTestPlan} setShow={setShowCreationTestPlan}
                                          testPlans={testPlans} params={params}
                                          treeSuites={treeSuites}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TestplansComponent