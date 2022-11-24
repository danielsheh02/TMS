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
import {useNavigate} from "react-router-dom";


const Project: React.FC = () => {
    const navigate = useNavigate();
    const labels = [['НАЗВАНИЕ', '#000000'], ['ВСЕГО', '#000000'], ['PASSED', '#24b124'],
        ['SKIPPED', '#c4af30'], ['FAILED', '#bd2828'], ['RETEST', '#6c6c6c'],
        ['ДАТА', '#000000'], ['ЗАПУСКАЛ', '#000000']];
    const checkboxesLabels = ["passed", "skipped", "failed", "retest"];
    const getMinStatusIndex = () => labels.findIndex((value) => checkboxesLabels.includes(value[0].toLowerCase()))
    const minStatusIndex = getMinStatusIndex();
    const maxStatusIndex = minStatusIndex + checkboxesLabels.length - 1;
    const charts = [<LineChartComponent/>, <PieChartComponent/>, <AreaChartComponent/>];
    const [isSwitched, setSwitch] = React.useState(false);
    const handleOnSwitch = (event: ChangeEvent<HTMLInputElement>) => setSwitch(event.target.checked);
    const [showFilter, setShowFilter] = React.useState(false);
    const handleOnOpenFilter = () => setShowFilter(!showFilter);
    const [startDate, setStartDate] = React.useState<Moment | null>(moment("01.01.1970"));
    const [endDate, setEndDate] = React.useState<Moment | null>(moment());
    const handleChangeStartDate = (newValue: Moment | null) => setStartDate(newValue);
    const handleChangeEndDate = (newValue: Moment | null) => setEndDate(newValue);
    const handleOnOpenProjectSettings = () => navigate('/projectSettings');
    const handleOnShowStatus = (status: string) => {
        setStatusesToShow({...statusesShow, [status]: !statusesShow[status]})
    };
    const [statusesShow, setStatusesToShow] = React.useState<{ [key: string]: boolean; }>(
        {
            "passed": true,
            "skipped": true,
            "failed": true,
            "retest": true
        }
    );

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
                {checkboxesLabels.map((value) =>
                    <FormControlLabel
                        control={<Checkbox checked={statusesShow[value]} onClick={() => handleOnShowStatus(value)}/>}
                        label={value.toUpperCase()}/>
                )}
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <div style={{marginLeft: '10px'}}>
                        <DesktopDatePicker
                            label="Выберите дату начала"
                            inputFormat="DD/MM/YYYY"
                            value={startDate}
                            onChange={handleChangeStartDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div style={{marginLeft: '10px'}}>
                        <DesktopDatePicker
                            label="Выберите дату окончания"
                            inputFormat="DD/MM/YYYY"
                            value={endDate}
                            onChange={handleChangeEndDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
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
                                    onClick={handleOnOpenProjectSettings}
                            >Настройки</Button>
                        </Stack>
                        {showFilter ? filter : null}
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead sx={{mb: '20px'}}>
                                    <TableRow>
                                        {labels.map(([value, color]) => {
                                            if (!checkboxesLabels.includes(value.toLowerCase())) {
                                                return <TableCell>
                                                    <Typography color={color} fontWeight={'bolder'}
                                                                align={'center'}>{value}</Typography>
                                                </TableCell>
                                            }
                                            if (statusesShow[value.toLowerCase()]) {
                                                return <TableCell>
                                                    <Typography color={color} fontWeight={'bolder'}
                                                                align={'center'}>{value}</Typography>
                                                </TableCell>
                                            }
                                            return <></>;
                                        })}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(isSwitched ? personalTestsData : testsData)?.map(
                                        ([title, all, passed, skipped, failed, retest, date, tester]) =>
                                            (!moment(date, "DD.MM.YYYY").isBetween(startDate, endDate, undefined, "[]")) ? null :
                                                (<TableRow>
                                                    {[title, all, passed, skipped, failed, retest, date, tester].map(
                                                        (value, index) => {
                                                            if (index < minStatusIndex || index > maxStatusIndex) {
                                                                return <TableCell>
                                                                    <Typography align={'center'}>{value}</Typography>
                                                                </TableCell>
                                                            }
                                                            if (statusesShow[checkboxesLabels[index - minStatusIndex]]) {
                                                                return <TableCell>
                                                                    <Typography align={'center'}>{value}</Typography>
                                                                </TableCell>
                                                            }
                                                            return <></>;
                                                        }
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

export default Project;