import React, {useState} from "react";
import useStyles from "../../styles/styles";
import {Button, Grid} from "@material-ui/core";
import CreationCase from "../testcases/creation.case.component";
import CreationSuite from "../testcases/creation.suite.component";
import TableTestPlans from "./table.testplans.component";
import BarChartComponent from "./bar.chart.component";
import CreationTestPlan from "./creation.testplan";

const TestPlansComponent: React.FC = () => {
    const [showCreationTestPlan, setShowCreationTestPlan] = useState(false)

    const handleShowCreationTestPlan = () => setShowCreationTestPlan(true)

    return (
        <Grid container style={{
            marginTop: 0,
            position: "absolute",
            height: "91%",
            width: "100%"
        }}>
            <Grid xs={10} item >
                <TableTestPlans/>
            </Grid>
            <Grid xs={2} item style={{
                backgroundColor: "#eeeeee"
            }}>
                <Grid style={{ display: "flex", flexDirection: "column"}}>
                    <Grid style={{textAlign: "center",}}>
                        <Button style={{
                            margin: 15,
                            minWidth: "70%",
                            height: "45%",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                        }} onClick={handleShowCreationTestPlan}>Создать тест-план</Button>
                        <CreationTestPlan show={showCreationTestPlan} setShow={setShowCreationTestPlan}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TestPlansComponent