import React from 'react';
import {
    Grid,
    Paper,
    Stack,
    Table,
    TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import LineChartComponent from "./charts/line.chart.component";
import PieChartComponent from "./charts/pie.chart.component";
import AreaChartComponent from "./charts/area.chart.component";
import {testsData} from "./dataExample";


const Projects: React.FC = () => {
    const labels = [['НАЗВАНИЕ', '#000000'], ['ВСЕГО', '#000000'], ['PASSED', '#24b124'],
        ['SKIPPED', '#c4af30'], ['FAILED', '#bd2828'], ['RETEST', '#6c6c6c'],
        ['ДАТА', '#000000'], ['ЗАПУСКАЛ', '#000000']]
    const chartsLabels = ["График результатов тестов по дням", "Диаграмма кол-ва назначенных\n" +
    "                    тестов", "График сравнения ожидаемого время и\n" +
    "                    результата"]
    const charts = [<LineChartComponent/>, <PieChartComponent/>, <AreaChartComponent/>]

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {/*<Grid sx={{display: 'flex', justifyContent: 'center', mt: "20px"}}>*/}
            {/*    {chartsLabels.map((label) =>*/}
            {/*        <Typography variant={"h6"} width={"30%"} align={"center"}>{label}</Typography>)*/}
            {/*    }*/}
            {/*</Grid>*/}
            <Grid sx={{display: 'flex', justifyContent: 'center', mt: '20px'}}>
                {charts.map((chart) =>
                    <div style={{width: "30%"}}>
                        {chart}
                    </div>)
                }
            </Grid>
            <Paper sx={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: "#858585",
                margin: "50px auto",
                width: "100%",
                padding: "10px 10px 10px 10px"
            }}>
                <Stack
                    sx={{}}>
                    <Typography color={"white"} fontWeight={700} fontSize={24} mb={'20px'} align={'center'}>
                        Активность проекта
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead sx={{mb: '20px'}}>
                                <TableRow>
                                    {labels.map(([value, color]) => (
                                        <TableCell>
                                            <Typography color={color} fontWeight={'bold'}
                                                        align={'center'}>{value}</Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {testsData.map((row) =>
                                    <TableRow>
                                        {row.map((value) =>
                                            <TableCell>
                                                <Typography align={'center'}>{value}</Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Button variant="contained"
                        style={{alignSelf: 'flex-start', marginLeft: '20px'}}>Моя активность</Button>
                <Button variant="contained"
                        style={{alignSelf: 'flex-start', marginLeft: '20px'}}>Фильтр</Button>
            </Paper>
        </div>
    );
};

export default Projects;