import React, {useEffect, useRef} from "react";
import useStyles from "../../styles/styles";
import {
    alpha,
    Checkbox,
    Chip, Collapse, FormControlLabel, FormGroup,
    Grid,
    IconButton, Link, Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer, TableHead,
    TableRow
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BarChartComponent from "./bar.chart.component";

function createTestPlan(
    name: string,
    params: string[],
    tests: { passed: number, failed: number, untested: number },
    testPlans?: any
) {
    return {
        name,
        params,
        tests,
        testPlans,
    };
}

const TableTestPlans = (props: {}) => {
    const classes = useStyles()
    const testPlans = [
            createTestPlan('Тест-план 1',
                ['Windows', 'Full HD', 'Mozilla Firefox'], {passed: 20, failed: 5, untested: 15}),

        ]
    // createTestPlan('Тест-план 2', ['Linux', 'Full HD', 'Mozilla Firefox'], {passed: 20, failed: 5, untested: 15})
    ;

    return (
        <Grid style={{justifyContent: "center", display: "flex"}}>
            <TableContainer style={{maxWidth: "80%", margin: 30, padding: 20}} component={Paper}>
                <Table size="small" aria-label="simple table" sx={{minWidth: 650}}>
                    <TableBody>
                        {testPlans.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={{width: "1%"}}>
                                    <FormControlLabel
                                        label={"0" + (index + 1)}
                                        control={<Checkbox
                                            style={{height: 20}}
                                            color="primary"
                                        />}
                                    />
                                </TableCell>
                                <TableCell style={{width: "80%"}} scope="row">
                                    <Grid>
                                        {row.name + "   ["}
                                        {row.params.map((param, index) => (
                                            <Chip className={classes.chipTagsStatusInSuites} key={index}
                                                  style={{
                                                      margin: 5,
                                                      borderRadius: 10,
                                                      maxWidth: 300
                                                  }} label={param}/>
                                        ))}
                                        ]
                                    </Grid>
                                    <Grid>
                                        {row.tests.passed + " пройдено, " + row.tests.failed + " провалено, " + row.tests.untested + " ожидает "}
                                    </Grid>
                                </TableCell>
                                <TableCell align="right" scope="row">
                                    <BarChartComponent/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Grid>
    )
}

export default TableTestPlans