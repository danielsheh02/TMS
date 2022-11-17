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
import {testPlan, treeTestPlan} from "./testplans.component";

// function createTestPlan(
//     name: string,
//     id: number,
//     params: string[],
//     tests: { passed: number, failed: number, untested: number },
//     testPlans?: {
//         name: string,
//         id: number,
//         params: string[],
//         tests: { passed: number, failed: number, untested: number },
//     }[]
// ) {
//     return {
//         name,
//         id,
//         params,
//         tests,
//         testPlans,
//     };
// }

function Row(props: {
    row: treeTestPlan, selected: readonly string[], setSelected: (array: readonly string[]
    ) => void,
}) {
    const classes = useStyles()
    const {row, selected, setSelected} = props;
    const [open, setOpen] = React.useState(true);

    // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (row.testPlans) {
    //         if (event.target.checked) {
    //             const newSelected = row.chi.map((n) => n.name);
    //             setSelected(newSelected);
    //             return;
    //         }
    //         setSelected([]);
    //     }
    // };

    // const isSelected = (name: string) => {
    //     return selected.indexOf(name) !== -1
    // };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
        <React.Fragment>
            <TableRow style={{paddingBottom: 0, paddingTop: 0, paddingRight: 0, marginRight: 0}}>
                <Table size="small">
                    <TableBody style={{border: '1px solid'}}>

                        <TableCell style={{width: "15%"}}>
                            {/*{row.testPlans &&*/}
                            {/*<IconButton*/}
                            {/*    style={{marginLeft: 1, marginTop: 7}}*/}
                            {/*    aria-label="expand row"*/}
                            {/*    size="small"*/}
                            {/*    onClick={() => setOpen(!open)}*/}
                            {/*>*/}
                            {/*    <KeyboardArrowUpIcon sx={{*/}
                            {/*        transform: open ? 'rotate(0deg)' : 'rotate(180deg)',*/}
                            {/*        transition: '0.2s',*/}
                            {/*    }}/>*/}
                            {/*</IconButton>}*/}

                            <FormControlLabel
                                label={row.id}
                                control={<Checkbox
                                    style={{height: 20}}
                                    color="primary"
                                />}
                            />
                        </TableCell>
                        <TableCell style={{width: "auto"}}>
                            <Grid>
                                {row.title}
                            </Grid>
                            {/*<Grid>
                                {row.tests.passed + " пройдено, " + row.tests.failed + " провалено, " + row.tests.untested + " ожидает "}
                            </Grid>*/}
                            <Grid>
                                {"пройдено, провалено и тд"}
                            </Grid>
                        </TableCell>
                        <TableCell align="right" style={{width: "25%"}}>
                            <BarChartComponent passed={20} failed={15}
                                               untested={30}/>
                        </TableCell>
                    </TableBody>

                    {row.children &&
                    <TableBody>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0, paddingRight: 0, margin: 0}} colSpan={3}>
                            <Collapse in={open} unmountOnExit mountOnEnter>
                                <Grid>
                                    {row.children.map((plan: any, index: number) => (
                                        <Row key={index} row={plan} selected={selected} setSelected={setSelected}
                                        />
                                    ))}
                                </Grid>
                            </Collapse>
                        </TableCell>
                    </TableBody>}

                </Table>
            </TableRow>
        </React.Fragment>
    );
}

const TableTestPlans =
    (props: { selected: readonly string[], setSelected: (array: readonly string[]) => void, testPlans: treeTestPlan[] }) => {
        const classes = useStyles()
        const {selected, setSelected, testPlans} = props

        return (
            <Grid style={{justifyContent: "center", display: "flex"}}>
                <TableContainer style={{maxWidth: "80%", margin: 30, padding: 20}}>
                    <Table size="small" sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                        }
                    }}>
                        <TableBody>
                            {testPlans.map((row, index) => (
                                <Row key={index} row={row} selected={selected} setSelected={setSelected}/>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
        )
    }

export default TableTestPlans