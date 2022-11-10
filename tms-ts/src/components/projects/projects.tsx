import React, {ChangeEvent} from 'react';
import {
    Checkbox,
    FormControlLabel, FormGroup,
    Grid,
    Paper,
    Stack, Switch,
    Table,
    TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Zoom
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import LineChartComponent from "./charts/line.chart.component";
import PieChartComponent from "./charts/pie.chart.component";
import AreaChartComponent from "./charts/area.chart.component";
import {personalTestsData, testsData} from "./dataExample";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import moment, {Moment} from "moment";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";


const Projects: React.FC = () => {
    const labels = [['НАЗВАНИЕ', '#000000'], ['ВСЕГО', '#000000'], ['PASSED', '#24b124'],
        ['SKIPPED', '#c4af30'], ['FAILED', '#bd2828'], ['RETEST', '#6c6c6c'],
        ['ДАТА', '#000000'], ['ЗАПУСКАЛ', '#000000']];
    const chartsLabels = ["График результатов тестов по дням", "Диаграмма кол-ва назначенных\n" +
    "                    тестов", "График сравнения ожидаемого время и\n" +
    "                    результата"];
    const charts = [<LineChartComponent/>, <PieChartComponent/>, <AreaChartComponent/>];
    const [isSwitched, setSwitch] = React.useState(false);
    const handleOnSwitch = (event: ChangeEvent<HTMLInputElement>) => setSwitch(event.target.checked);
    const [showFilter, setShowFilter] = React.useState(false);
    const handleOnOpenFilter = () => setShowFilter(!showFilter);
    const [value, setValue] = React.useState<Moment | null>(moment(),);
    const handleChange = (newValue: Moment | null) => {
        setValue(newValue);
    };

    const activityTitle = <>
        <Zoom in={!isSwitched}>
            <Typography fontWeight={600} fontSize={24} mr={'5px'} ml={'5px'}>
                Активность проекта
            </Typography>
        </Zoom>
        <Switch checked={isSwitched} onChange={handleOnSwitch}/>
        <Zoom in={!isSwitched}>
            <Typography fontWeight={600} fontSize={24} mr={'5px'} ml={'5px'} color={'grey'}>
                Моя
            </Typography>
        </Zoom>
    </>
    const switchedActivityTitle = <>
        <Zoom in={isSwitched}>
            <Typography fontWeight={600} fontSize={24} mr={'5px'} ml={'5px'} color={'grey'}>
                Проекта
            </Typography>
        </Zoom>
        <Switch checked={isSwitched} onChange={handleOnSwitch}/>
        <Zoom in={isSwitched}>
            <Typography fontWeight={600} fontSize={24} mr={'5px'} ml={'5px'}>
                Моя активность
            </Typography>
        </Zoom>
    </>

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
            <Paper sx={{display: 'flex', justifyContent: 'center', pt: '50px'}} elevation={0}>
                <Paper
                    elevation={5}
                    sx={{
                        alignSelf: 'flex-start',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: "20px 10px 10px 10px",
                        mr: '10px'
                    }}>
                    <Stack>
                        <Stack direction={"row"} justifyContent={"center"}>
                            {isSwitched ? switchedActivityTitle : activityTitle}
                        </Stack>
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
                                    {(isSwitched ? personalTestsData : testsData).map(
                                        (row) =>
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
                </Paper>
                <Stack>
                    <Button variant="contained"
                            style={{alignSelf: "flex-start", marginLeft: '10px'}}
                            onClick={handleOnOpenFilter}>Фильтр</Button>
                    <Zoom in={showFilter}>
                        <Paper sx={{display: 'flex', justifyContent: 'center'}}>
                            <FormGroup sx={{display: 'flex', justifyContent: 'center'}}>
                                <FormControlLabel sx={{alignSelf: 'center'}} control={<Checkbox defaultChecked/>}
                                                  label="Passed"/>
                                <FormControlLabel sx={{alignSelf: 'center'}} control={<Checkbox defaultChecked/>}
                                                  label="Skipped"/>
                                <FormControlLabel sx={{alignSelf: 'center'}} control={<Checkbox defaultChecked/>}
                                                  label="Failed"/>
                                <FormControlLabel sx={{alignSelf: 'center'}} control={<Checkbox defaultChecked/>}
                                                  label="Retest"/>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DesktopDatePicker
                                        label="Choose date"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormGroup>
                        </Paper>
                    </Zoom>
                </Stack>
            </Paper>

        </div>
    );
};

export default Projects;