import {
    Grid, Paper, TableContainer, Table, TableBody,
    TableCell, TableRow, Collapse, IconButton, Chip, tableCellClasses, Checkbox, Typography, Link, Button, alpha
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";

function createSuite(
    name: string,
    cases: [{ name: string; tags: string[]; status: string }, { name: string; tags: string[]; status: string }],
    suites?: any
) {
    return {
        name,
        cases,
        suites,
    };
}

function Row(props: {
    row: ReturnType<typeof createSuite>, selected: readonly string[], setSelected: (array: readonly string[]
    ) => void, setShowCreationCase: (show: boolean) => void, setShowCreationSuite: (show: boolean) => void, open2: boolean
}) {
    const {row, selected, setSelected, setShowCreationCase, setShowCreationSuite, open2} = props;
    const [open, setOpen] = React.useState(false);
    // const [selected, setSelected] = React.useState<readonly string[]>([]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = row.cases.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: string) => {
        return selected.indexOf(name) !== -1
    };
    console.log(selected)
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
            <TableRow>
                <TableCell colSpan={4}>
                    <Grid sx={{display: "flex", flexDirection: "row", marginTop: 1}}>
                        <IconButton
                            style={{marginLeft: 9}}
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            <KeyboardArrowUpIcon sx={{
                                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: '0.2s',
                            }}/>
                        </IconButton>
                        <Chip style={{marginTop: 7}} label={row.name}/>

                    </Grid>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0, paddingRight: 0, marginRight: 10}} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid>
                            <Table size="small">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#eeeeee", border: '1px solid'}}>
                                        <TableCell style={{width: "1%"}}>
                                            <Checkbox
                                                indeterminate={selected.length > 0 && selected.length < row.cases.length}
                                                checked={selected.length > 0 && selected.length === row.cases.length}
                                                onChange={(e) => handleSelectAllClick(e)}
                                                color="primary"

                                            />
                                        </TableCell>
                                        <TableCell component="th"
                                                   scope="row"
                                                   padding="none" style={{width: "25%"}}>Название</TableCell>
                                        <TableCell align={"center"} style={{width: "40%"}}>Тэги</TableCell>
                                        <TableCell align={"center"} style={{width: "auto"}}>Статус</TableCell>
                                    </TableRow>
                                </TableBody>

                                <TableBody sx={{
                                    border: '1px solid',
                                }}>
                                    {row.cases.map((onecase, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, onecase.name)}
                                                    color="primary"
                                                    checked={isSelected(onecase.name)}
                                                />
                                            </TableCell>
                                            <TableCell component="th"
                                                // id={`enhanced-table-checkbox-${index}`}
                                                       scope="row"
                                                       padding="none">
                                                {onecase.name}
                                            </TableCell>
                                            <TableCell align={"center"} sx={{width: "50%"}}
                                            >
                                                <Grid sx={{overflowY: "auto", maxHeight: 90}}>
                                                    {onecase.tags.map((tag, index) => (<Chip key={index} style={{
                                                        margin: 5,
                                                        borderRadius: 10
                                                    }} label={tag}/>))}
                                                </Grid>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {onecase.status == "Failed" && <Chip style={{
                                                    width: 90,
                                                    padding: 3,
                                                    backgroundColor: alpha("#ff0000", 0.75),
                                                    color: "#ffffff",
                                                    borderRadius: 10
                                                }} label={onecase.status}/>
                                                ||
                                                onecase.status == "Passed" && <Chip style={{
                                                    width: 90,
                                                    padding: 3,
                                                    backgroundColor: alpha("#1da900", 0.75),
                                                    color: "#ffffff",
                                                    borderRadius: 10
                                                }} label={onecase.status}/>
                                                ||
                                                onecase.status == "Skipped" && <Chip style={{
                                                    width: 90,
                                                    padding: 3,
                                                    backgroundColor: alpha("#d3c100", 0.75),
                                                    color: "#ffffff",
                                                    borderRadius: 10
                                                }} label={onecase.status}/>
                                                ||
                                                onecase.status == "Retest" && <Chip style={{
                                                    width: 90,
                                                    padding: 3,
                                                    backgroundColor: alpha("#3a3939", 0.75),
                                                    color: "#ffffff",
                                                    borderRadius: 10
                                                }} label={onecase.status}/>
                                                ||
                                                onecase.status == "Untested" && <Chip style={{
                                                    width: 90,
                                                    padding: 3,
                                                    borderRadius: 10,
                                                    backgroundColor: alpha("#9f9f9f", 0.75),
                                                    color: "#ffffff"
                                                }} label={onecase.status}/>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Grid style={{display: "flex", flexDirection: "row"}}>
                                            <Link component="button" onClick={() => setShowCreationCase(true)}>
                                                Добавить тест-кейс
                                            </Link>
                                            <Link underline="none">&nbsp;&nbsp;|&nbsp;&nbsp;</Link>
                                            <Link component="button"
                                                  onClick={() => setShowCreationSuite(true)}>
                                                Добавить сьюту
                                            </Link>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                {row && row.suites &&
                                <TableBody>
                                    {row.suites.map((suite: any, index: number) => (
                                        <Row key={index} row={suite} selected={selected} setSelected={setSelected}
                                             setShowCreationCase={setShowCreationCase}
                                             setShowCreationSuite={setShowCreationSuite}
                                             open2={true}
                                        />
                                    ))}
                                </TableBody>}
                            </Table>
                        </Grid>

                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TableSuites = (props: {
    selected: readonly string[], setSelected: (array: readonly string[]) => void,
    setShowCreationCase: (show: boolean) => void, setShowCreationSuite: (show: boolean) => void
}) => {
    const {selected, setSelected, setShowCreationCase, setShowCreationSuite} = props;
    // const suiteChildChildChildChild = [createSuite('Уведомления на почту', [
    //     {
    //         name: 'Добавление пользователя',
    //         tags: 'СРОЧНО',
    //         status: 'Passed',
    //     },
    //     {
    //         name: 'Удаление пользователя',
    //         tags: 'НЕ НАДО ЭТО ТЕСТИРОВАТЬ',
    //         status: 'Failed',
    //     }
    // ],),]
    // const suiteChildChildChild = [createSuite('Уведомления на почту', [
    //     {
    //         name: 'Добавление пользователя',
    //         tags: 'СРОЧНО',
    //         status: 'Passed',
    //     },
    //     {
    //         name: 'Удаление пользователя',
    //         tags: 'НЕ НАДО ЭТО ТЕСТИРОВАТЬ',
    //         status: 'Failed',
    //     }
    // ],suiteChildChildChildChild,),]
    const suiteChildChild = [createSuite('Уведомления на почту', [
        {
            name: 'Добавление пользователя',
            tags: ['СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
                "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
                "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
                "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
                "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО"],
            status: 'Passed',
        },
        {
            name: 'Удаление пользователя',
            tags: ['НЕ НАДО ЭТО ТЕСТИРОВАТЬ'],
            status: 'Failed',
        }
    ],),]
    const suiteChild = [createSuite('Уведомления на почту', [
        {
            name: 'Добавление пользователя2',
            tags: ['СРОЧНО', 'ОЧЕНЬ'],
            status: 'Untested',
        },
        {
            name: 'Удаление пользователя2',
            tags: ['НЕ НАДО ЭТО ТЕСТИРОВАТЬ'],
            status: 'Failed',
        }
    ], suiteChildChild),]
    const suites = [
            createSuite('Система уведомлений',
                [
                    {
                        name: 'Добавление пользователя3',
                        tags: ['СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
                            "СРОЧНО", "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО"],
                        status: 'Passed',
                    },
                    {
                        name: 'Удаление пользователя3',
                        tags: ['НЕ НАДО ЭТО ТЕСТИРОВАТЬ'],
                        status: 'Failed',
                    }
                ], suiteChild
            ),
            createSuite('Регистрация пользователя',
                [
                    {
                        name: 'Сохранение пользователя в БД',
                        tags: ['СРОЧНО', 'ОЧЕНЬ'],
                        status: 'Skipped',
                    },
                    {
                        name: 'Удаление пользователя из БД',
                        tags: ['НЕ НАДО ЭТО ТЕСТИРОВАТЬ'],
                        status: 'Retest',
                    }
                ], suiteChild
            ),
        ]
    ;
    return (
        <Grid style={{justifyContent: "center", display: "flex"}}>
            <TableContainer style={{maxWidth: "80%", margin: 30, padding: 20}}>
                <Table size="small" sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    }
                }}>
                    <TableBody>
                        {suites.map((suite, index) => (
                            <Row key={index} row={suite} selected={selected} setSelected={setSelected}
                                 setShowCreationCase={setShowCreationCase}
                                 setShowCreationSuite={setShowCreationSuite} open2={true}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
export default TableSuites