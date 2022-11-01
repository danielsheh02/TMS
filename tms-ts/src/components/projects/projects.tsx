import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody, TableCell,
    TableContainer, TableRow
} from "@mui/material";
import {
    LineChart,
    PieChart,
    AreaChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Pie,
    Cell, Area
} from 'recharts';
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Projects: React.FC = () => {
    const labels = ['НАЗВАНИЕ', 'ВСЕГО', 'PASSED', 'SKIPPED', 'FAILED', 'RETEST']
    const exampleData = ['Тест-план 1', '13', '10', '1', '0', '2']
    const lineData = [
        {
            name: '20.10.2022',
            failed: 10,
            passed: 24,
            skipped: 1,
            retest: 0,
        },
        {
            name: '22.10.2022',
            failed: 30,
            passed: 13,
            skipped: 4,
            retest: 10,
        },
        {
            name: '23.10.2022',
            failed: 20,
            passed: 9,
            skipped: 0,
            retest: 3,
        },
        {
            name: '25.10.2022',
            failed: 27,
            passed: 3,
            skipped: 7,
            retest: 15,
        },
        {
            name: '28.10.2022',
            failed: 23,
            passed: 38,
            skipped: 3,
            retest: 7,
        },
    ];
    const pieData = [
        {name: 'Георгий', value: 14},
        {name: 'Андрей', value: 15},
        {name: 'Павел', value: 30},
        {name: 'Илья', value: 20},
    ];
    const areaData = [
        {
            name: 'Тест 1',
            result: 4000,
            expected: 2400,
        },
        {
            name: 'Тест 2',
            result: 3000,
            expected: 1398,
        },
        {
            name: 'Тест 3',
            result: 2000,
            expected: 9800,
        },
        {
            name: 'Тест 4',
            result: 2780,
            expected: 3908,
        },
    ];


    return (
        <div>
            <Grid sx={{display: 'flex', justifyContent: 'center', mt: "20px"}}>
                <Typography variant={"h6"} width={"30%"} align={"center"}>График результатов тестов по дням</Typography>
                <Typography variant={"h6"} width={"30%"} align={"center"}>Диаграмма кол-ва назначенных
                    тестов</Typography>
                <Typography variant={"h6"} width={"30%"} align={"center"}>График сравнения ожидаемого время и
                    результата</Typography>
            </Grid>
            <Grid sx={{display: 'flex', justifyContent: 'center', mt: "20px"}}>
                <div style={{width: "30%"}}>
                    <ResponsiveContainer height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line name={"Passed"} type="monotone" dataKey="passed" stroke={"#12ab00"} strokeWidth={3}/>
                            <Line name={"Failed"} type="monotone" dataKey="failed" stroke={"#b90000"} strokeWidth={3}/>
                            <Line name={"Skipped"} type="monotone" dataKey="skipped" stroke={"#e0d729"}
                                  strokeWidth={3}/>
                            <Line name={"Retest"} type="monotone" dataKey="retest" stroke={"#646464"} strokeWidth={3}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={{width: "30%", display: "flex", justifyContent: "center"}}>
                    <ResponsiveContainer height={300} width={"50%"}>
                        <PieChart>
                            <Pie data={pieData} dataKey={"value"} labelLine={true}>
                                <Cell fill={"#98d589"}/>
                                <Cell fill={"#d99292"}/>
                                <Cell fill={"#ce7655"}/>
                                <Cell fill={"#8884d8"}/>
                            </Pie>
                            <Legend/>
                            <Tooltip formatter={(value, name) => ["Тестов назначено -- " + value, name]}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>


                <div style={{width: "30%"}}>
                    <ResponsiveContainer height={300}>
                        <AreaChart data={areaData}>
                            <CartesianGrid/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip formatter={(value, name) => [value + " ms", name]}/>
                            <Legend/>
                            <Area name={"Ожидалось"} type="monotone" dataKey="expected" fill={"#8884d8"}
                                  stroke={"#8884d8"}/>
                            <Area name={"Результат"} type="monotone" dataKey="result" fill={"#82ca9d"}
                                  stroke={"#82ca9d"}/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </Grid>
            <Paper sx={{display: 'flex', justifyContent: 'center', backgroundColor: "#858585"}}>
                <Stack>
                    <Typography color={"white"} fontWeight={700} fontSize={24} mb={'20px'}>
                        Активность проекта
                    </Typography>
                    <TableContainer component={Paper} sx={{mb: '20px'}}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    {labels.map((value) => (
                                        <TableCell>
                                            <Typography>{value}</Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>27/10/22</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            {exampleData.map((value) => (
                                                <TableCell>
                                                    <Typography>{value}</Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>

                </Stack>
                <Button variant="contained"
                        style={{maxHeight: '20px', fontWeight: 600, margin: '20px 20px 20px'}}>Моя активность</Button>
                <Button variant="contained"
                        style={{maxHeight: '20px', fontWeight: 600, margin: '20px 20px 20px'}}>Фильтр</Button>
            </Paper>

        </div>

    );
};

export default Projects;