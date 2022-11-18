import {
    Grid, TableContainer, Table, TableBody,
    TableCell, TableRow, Collapse, IconButton, Chip, tableCellClasses, Checkbox, Link
} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, {useEffect, useRef, useState} from "react";
import useStyles from "../../styles/styles";
import {treeSuite} from "./suites.component";

const tags = ['asdf', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
    "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ',
    "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО", 'СРОЧНО', 'ОЧЕНЬ', "СРОЧНО"];

const stat1 = "Failed"
const stat2 = "Failed"

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

function CaseTagsField(props: { tags: any[] }) {
    const {tags} = props
    const classes = useStyles()
    const [showMore, setShowMore] = React.useState(false);
    const [showLink, setShowLink] = React.useState(false);
    const gridTagsRef = useRef<any>(null);
    useEffect(() => {
        if (gridTagsRef.current && gridTagsRef.current.clientHeight < gridTagsRef.current.scrollHeight) {
            setShowLink(true);
        }
    })

    const onClickMore = () => {
        setShowMore(!showMore);
    }
    return (
        <Grid>
            <Grid ref={gridTagsRef}
                  className={showMore ? "" : classes.gridTags}
            >
                {tags.map((tag, index) => (

                    <Chip className={classes.chipTagsStatusInSuites} key={index}
                          style={{
                              margin: 5,
                              borderRadius: 10,
                              maxWidth: 300
                          }} label={tag}/>

                ))
                }
            </Grid>
            <Grid style={{display: "flex", justifyContent: "left", marginLeft: 35}}>
                {(showLink && showMore && <Link component="button" onClick={() => onClickMore()}>
                    Свернуть
                </Link>)
                ||
                (showLink && !showMore && <Link component="button" onClick={() => onClickMore()}>
                    Развернуть
                </Link>)}
            </Grid>
        </Grid>
    )
}

function CaseScenarioField(props: { scenario: string }) {
    const {scenario} = props
    const classes = useStyles()
    const [showMore, setShowMore] = React.useState(false);
    const [showLink, setShowLink] = React.useState(false);
    const gridTagsRef = useRef<any>(null);
    useEffect(() => {
        if (gridTagsRef.current && gridTagsRef.current.clientHeight < gridTagsRef.current.scrollHeight) {
            setShowLink(true);
        }
    })

    const onClickMore = () => {
        setShowMore(!showMore);
    }
    return (
        <Grid>
            <Grid ref={gridTagsRef}
                  className={showMore ? "" : classes.gridScenario}
            >
                {scenario}
            </Grid>
            <Grid style={{display: "flex", justifyContent: "left", marginLeft: 35}}>
                {(showLink && showMore && <Link component="button" onClick={() => onClickMore()}>
                    Свернуть
                </Link>)
                ||
                (showLink && !showMore && <Link component="button" onClick={() => onClickMore()}>
                    Развернуть
                </Link>)}
            </Grid>
        </Grid>
    )
}

function Row(props: {
    row: treeSuite, setShowCreationCase: (show: boolean) => void, setShowCreationSuite: (show: boolean) => void,
    setSelectedSuiteCome: (selectedSuite: { id: number, name: string } | null) => void, treeSuitesOpenMap: Map<number, boolean>,
    setTreeSuitesOpenMap: (newMap: (prev: Map<number, boolean>) => any) => void
}) {
    const classes = useStyles()
    const {
        row,
        setShowCreationCase,
        setShowCreationSuite,
        setSelectedSuiteCome,
        treeSuitesOpenMap,
        setTreeSuitesOpenMap
    } = props;
    const [localOpen, setLocalOpen] = React.useState<boolean | undefined>(undefined);
    const [selected, setSelected] = React.useState<number []>([]);
    // const [selected, setSelected] = React.useState<readonly string[]>([]);
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = row.test_cases.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

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

    useEffect(() => {
        if (treeSuitesOpenMap.get(row.id) === undefined) {
            setTreeSuitesOpenMap(prev => (prev.set(row.id, true)))
            setLocalOpen(true)
        } else {
            setLocalOpen(treeSuitesOpenMap.get(row.id))
        }
    })

    const setOpenClose = () => {
        const flag = treeSuitesOpenMap.get(row.id)
        setTreeSuitesOpenMap(prev => (prev.set(row.id, !flag)))
        setLocalOpen(!flag)
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell colSpan={4}>
                    <Grid sx={{display: "flex", flexDirection: "row", marginTop: 1}} id={row.id.toString()}>
                        <Chip onClick={setOpenClose} icon={<IconButton
                            style={{marginLeft: 1}}
                            aria-label="expand row"
                            size="small"
                        >
                            <KeyboardArrowUpIcon sx={{
                                transform: treeSuitesOpenMap.get(row.id) ? 'rotate(0deg)' : 'rotate(180deg)',
                                transition: '0.2s',
                            }}/>
                        </IconButton>} style={{marginTop: 7}} label={row.name}/>
                    </Grid>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 7, paddingRight: 0, marginRight: 10}} colSpan={4}>
                    {(localOpen == true || localOpen == false) && <Collapse in={localOpen} mountOnEnter>
                        <Grid>
                            <Table size="small">
                                <TableBody style={{border: '1px solid'}}>
                                    <TableRow style={{backgroundColor: "#eeeeee"}}>
                                        <TableCell style={{width: "1%"}}>
                                            <Checkbox
                                                style={{height: 20}}
                                                indeterminate={selected.length > 0 && selected.length < row.test_cases.length}
                                                checked={selected.length > 0 && selected.length === row.test_cases.length}
                                                onChange={(e) => handleSelectAllClick(e)}
                                                color="primary"

                                            />
                                        </TableCell>
                                        <TableCell component="th"
                                                   scope="row"
                                                   padding="none" style={{width: "25%"}}>Название</TableCell>
                                        <TableCell align={"center"} style={{width: "40%"}}>Описание</TableCell>
                                        <TableCell align={"center"} style={{width: "40%"}}>Время прохождения</TableCell>
                                        {/*<TableCell align={"center"} style={{width: "40%"}}>Тэги</TableCell>*/}
                                        {/*<TableCell align={"center"} style={{width: "auto"}}>Статус</TableCell>*/}
                                    </TableRow>
                                </TableBody>
                                <TableBody style={{border: '1px solid'}}>
                                    {row.test_cases.map((onecase, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Checkbox
                                                    style={{height: 25}}
                                                    onClick={(event) => handleClick(event, onecase.id)}
                                                    color="primary"
                                                    checked={selected.indexOf(onecase.id) !== -1}
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
                                                <CaseScenarioField scenario={onecase.scenario}/>
                                                {/*<CaseTagsField tags={tags}/>*/}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {
                                                    (onecase.estimate &&
                                                        <Chip className={classes.chipTagsStatusInSuites} key={index}
                                                              style={{
                                                                  margin: 5,
                                                                  borderRadius: 10,
                                                                  maxWidth: 300
                                                              }} label={onecase.estimate}/>) ||
                                                    <Chip className={classes.chipTagsStatusInSuites} key={index}
                                                          style={{
                                                              margin: 5,
                                                              borderRadius: 10,
                                                              maxWidth: 300
                                                          }} label="-----"/>
                                                    // stat1 == "Failed" &&
                                                    // <Chip className={classes.chipTagsStatusInSuites} style={{
                                                    //     backgroundColor: alpha("#ff0000", 0.75),
                                                    //     color: "#ffffff",
                                                    //     borderRadius: 10,
                                                    // }} label={stat1}/>
                                                    // ||
                                                    // stat == "Passed" &&
                                                    // <Chip className={classes.chipTagsStatusInSuites} style={{
                                                    //     backgroundColor: alpha("#1da900", 0.75),
                                                    //     color: "#ffffff",
                                                    //     borderRadius: 10
                                                    // }} label={stat}/>
                                                    // ||
                                                    // stat == "Skipped" &&
                                                    // <Chip className={classes.chipTagsStatusInSuites} style={{
                                                    //     backgroundColor: alpha("#d3c100", 0.75),
                                                    //     color: "#ffffff",
                                                    //     borderRadius: 10
                                                    // }} label={stat}/>
                                                    // ||
                                                    // stat == "Retest" &&
                                                    // <Chip className={classes.chipTagsStatusInSuites} style={{
                                                    //     backgroundColor: alpha("#3a3939", 0.75),
                                                    //     color: "#ffffff",
                                                    //     borderRadius: 10
                                                    // }} label={stat}/>
                                                    // ||
                                                    // stat == "Untested" &&
                                                    // <Chip className={classes.chipTagsStatusInSuites} style={{
                                                    //     borderRadius: 10,
                                                    //     backgroundColor: alpha("#9f9f9f", 0.75),
                                                    //     color: "#ffffff"
                                                    // }} label={stat}/>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Grid style={{display: "flex", flexDirection: "row"}}>
                                                <Link component="button" onClick={() => {
                                                    setShowCreationCase(true)
                                                    setSelectedSuiteCome({id: row.id, name: row.name})
                                                }}>
                                                    Добавить тест-кейс
                                                </Link>
                                                <Link underline="none">&nbsp;&nbsp;|&nbsp;&nbsp;</Link>
                                                <Link component="button"
                                                      onClick={() => {
                                                          setShowCreationSuite(true)
                                                          setSelectedSuiteCome({id: row.id, name: row.name})
                                                      }}>
                                                    Добавить сьюту
                                                </Link>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                {row && row.children &&
                                <TableBody>
                                    {row.children.map((suite: any, index: number) => (
                                        <Row key={index} row={suite}
                                             setShowCreationCase={setShowCreationCase}
                                             setShowCreationSuite={setShowCreationSuite}
                                             setSelectedSuiteCome={setSelectedSuiteCome}
                                             treeSuitesOpenMap={treeSuitesOpenMap}
                                             setTreeSuitesOpenMap={setTreeSuitesOpenMap}/>
                                    ))}
                                </TableBody>}
                            </Table>
                        </Grid>

                    </Collapse>}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TableSuites = (props: {
    selected: readonly string[], setSelected: (array: readonly string[]) => void,
    setShowCreationCase: (show: boolean) => void, setShowCreationSuite: (show: boolean) => void,
    suites: treeSuite[], setSelectedSuiteCome: (selectedSuite: { id: number, name: string } | null) => void,
}) => {
    const {setShowCreationCase, setShowCreationSuite, suites, setSelectedSuiteCome} = props;
    const [treeSuitesOpenMap, setTreeSuitesOpenMap] = useState(new Map())

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
                            <Row key={index} row={suite}
                                 setShowCreationCase={setShowCreationCase}
                                 setShowCreationSuite={setShowCreationSuite}
                                 setSelectedSuiteCome={setSelectedSuiteCome}
                                 treeSuitesOpenMap={treeSuitesOpenMap}
                                 setTreeSuitesOpenMap={setTreeSuitesOpenMap}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
export default TableSuites