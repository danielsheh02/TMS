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
    const charts = [<LineChartComponent/>, <PieChartComponent/>, <AreaChartComponent/>];
    const [isSwitched, setSwitch] = React.useState(false);
    const handleOnSwitch = (event: ChangeEvent<HTMLInputElement>) => setSwitch(event.target.checked);
    const [showFilter, setShowFilter] = React.useState(false);
    const handleOnOpenFilter = () => setShowFilter(!showFilter);
    const [startValue, setStartValue] = React.useState<Moment | null>(moment("01.01.1970"),);
    const [endValue, setEndValue] = React.useState<Moment | null>(moment(),);
    const handleChangeStartValue = (newValue: Moment | null) => {
        setStartValue(newValue);
    };
    const handleChangeEndValue = (newValue: Moment | null) => {
        setEndValue(newValue);
    };

    const activityTitle = <Stack direction={"row"}>
        <Zoom in={!isSwitched}>
            <Typography fontSize={24} mr={'5px'} ml={'5px'}>
                Активность проекта
            </Typography>
        </Zoom>
        <Switch checked={isSwitched} onChange={handleOnSwitch}/>
        <Zoom in={!isSwitched}>
            <Typography fontSize={24} mr={'5px'} ml={'5px'} color={'grey'}>
                Моя
            </Typography>
        </Zoom>
    </Stack>
    const switchedActivityTitle = <Stack direction={"row"}>
        <Zoom in={isSwitched}>
            <Typography fontSize={24} mr={'5px'} ml={'5px'} color={'grey'}>
                Проекта
            </Typography>
        </Zoom>
        <Switch checked={isSwitched} onChange={handleOnSwitch}/>
        <Zoom in={isSwitched}>
            <Typography fontSize={24} mr={'5px'} ml={'5px'}>
                Моя активность
            </Typography>
        </Zoom>
    </Stack>
    const filter = <Zoom in={showFilter} style={{marginBottom: '10px'}}>
        <Grid sx={{display: 'flex', justifyContent: 'center'}}>
            <FormGroup sx={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
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
                        label="Choose start date"
                        inputFormat="DD/MM/YYYY"
                        value={startValue}
                        onChange={handleChangeStartValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label="Choose end date"
                        inputFormat="DD/MM/YYYY"
                        value={endValue}
                        onChange={handleChangeEndValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormGroup>
        </Grid>
    </Zoom>

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Grid sx={{display: 'flex', justifyContent: 'center', mt: '20px'}}>
                {charts.map((chart) =>
                    <div style={{width: "30%"}}>
                        {chart}
                    </div>)
                }
            </Grid>
            <Grid sx={{width: '100%', justifyContent: 'center', pt: '50px'}}>
                <Paper
                    elevation={5}
                    sx={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        padding: "20px 10px 10px 10px",
                    }}>
                    <Stack>
                        <Stack direction={"row"} margin={"auto"} mb={'10px'}>
                            {isSwitched ? switchedActivityTitle : activityTitle}
                            <Button variant="contained"
                                    style={{marginLeft: '10px'}}
                                    onClick={handleOnOpenFilter}>Фильтр</Button>
                            <Button variant="contained"
                                    style={{marginLeft: '10px'}}
                            >Настройки</Button>
                        </Stack>
                        {showFilter ? filter : null}
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead sx={{mb: '20px'}}>
                                    <TableRow>
                                        {labels.map(([value, color]) => (
                                            <TableCell>
                                                <Typography color={color} fontWeight={'bolder'}
                                                            align={'center'}>{value}</Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(isSwitched ? personalTestsData : testsData)?.map(
                                        ([title, all, passed, skipped, failed, retest, date, tester]) =>
                                            (!moment(date, "DD.MM.YYYY").isBetween(startValue, endValue, undefined, "[]")) ? null :
                                                (<TableRow>
                                                    {[title, all, passed, skipped, failed, retest, date, tester].map(
                                                        (value) =>
                                                            <TableCell>
                                                                <Typography align={'center'}>{value}</Typography>
                                                            </TableCell>
                                                    )}
                                                </TableRow>)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Paper>
            </Grid>

        </div>
    );
};

export default Projects;