import React, {useEffect, useState} from "react";
import {
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow, Typography
} from "@mui/material";
import BarChartComponent from "./bar.chart.component";
import {treeTestPlan} from "./testplans.component";
import TestPlanService from "../../services/testplan.service";
import {testPlan} from "../models.interfaces";


const TableTestPlans = (props: {
    testplan: treeTestPlan
}) => {
    const {testplan} = props;
    const [currentTestPlan, setCurrentTestPlan] = useState<testPlan>()
    const [selected, setSelected] = React.useState<number []>([]);

    useEffect(() => {
        TestPlanService.getTestPlan(testplan.id).then((response) => {
            setCurrentTestPlan(response.data)
        })
            .catch((e) => {
                console.log(e);
            });
    })

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    return (
        <TableRow style={{paddingBottom: 0, paddingTop: 0, paddingRight: 0, marginRight: 0}}>
            <TableCell style={{paddingBottom: 3}}>
                <Table size="small">
                    {<TableBody style={{border: '1px solid'}}>
                        <TableRow>
                            <TableCell style={{width: "15%"}}>
                                <FormControlLabel
                                    label={testplan.id}
                                    control={<Checkbox
                                        style={{height: 20}}
                                        onClick={(event) => handleClick(event, testplan.id)}
                                        color="primary"
                                    />}
                                />
                            </TableCell>
                            <TableCell style={{width: "auto"}}>
                                <Grid>

                                    <Link href={"/testplans/" + testplan.id} underline="none"
                                          style={{display: 'flex', color: '#282828'}}>
                                        <Typography style={{paddingBottom: 2}}>
                                            {testplan.title}
                                        </Typography>
                                    </Link>

                                </Grid>
                                <Grid>
                                    {"Количество дочерних тест-планов: " + testplan.children.length + ". Количество тестов: " + currentTestPlan?.tests?.length}
                                </Grid>
                            </TableCell>
                            <TableCell align="right" style={{width: "25%"}}>
                                <BarChartComponent passed={20} failed={15} untested={30}/> {/*TODO*/}
                            </TableCell>
                        </TableRow>
                    </TableBody>}
                </Table>
            </TableCell>
        </TableRow>
    )
}

export default TableTestPlans