import {
    Button, Grid
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useStyles from "../../styles/styles";
import CreationCase from "./creation.case.component";
import CreationSuite from "./creation.suite.component";
import TableSuites from "./table.suites.component";
import SuiteCaseService from "../../services/suite.case.service";
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderSuites from "./folder.suites.component";

interface myCase {
    id: number;
    name: string;
    suite: number;
    scenario: string;
    project: number;
    estimate: number
    url?: string;
}

export interface treeSuite {
    id: number;
    level: number;
    name: string;
    children: suite[];
    test_cases: myCase [];
}

export interface suite {
    id: number;
    name: string;
    parent: null | number;
    project: number;
    url: string;
}


const SuitesComponent: React.FC = () => {
    const classes = useStyles()
    const [showCreationCase, setShowCreationCase] = useState(false)
    const [showCreationSuite, setShowCreationSuite] = useState(false)
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [suites, setSuites] = useState<suite []>([])
    const [treeSuites, setTreeSuites] = useState([])
    const [cases, setCases] = useState([])
    const [selectedSuiteCome, setSelectedSuiteCome] = useState<{ id: number, name: string } | null>(null)

    // const createTreeStructureSuitesCases = (localSuites: any, localCases: any) => {
    //     const treeOfSuites: suite [] = []
    //     const newArray = localSuites.filter((st: suite) => st.parent == null)
    //     // console.log(newArray)
    //     // console.log(localSuites)
    // }
    console.log(selectedSuiteCome)
    // console.log(cases)
    useEffect(() => {
        // SuiteCaseService.authorize().then((response) => {
        //     const token = response.data.access
            SuiteCaseService.getSuites().then((response) => {
                // const localSuites = response.data
                setSuites(response.data)
                SuiteCaseService.getCases().then((response) => {
                    // const localCases = response.data
                    setCases(response.data)
                    SuiteCaseService.getTreeSuites().then((response) => {
                        // const localTreeSuites = response.data
                        setTreeSuites(response.data)
                    })
                })
            })
        // })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    const handleShowCreationCase = () => {
        setShowCreationCase(true)
        setSelectedSuiteCome({id: suites[0].id, name: suites[0].name})
    }

    const handleShowCreationSuite = () => {
        setShowCreationSuite(true)
        setSelectedSuiteCome(null)
    }
    return (
        <Grid container style={{
            marginTop: 0,
            position: "absolute",
            height: "91%",
            width: "100%"
        }}>
            <Grid xs={10} item>
                <TableSuites selected={selected} setSelected={setSelected}
                             setShowCreationCase={setShowCreationCase}
                             setShowCreationSuite={setShowCreationSuite}
                             setSelectedSuiteCome={setSelectedSuiteCome}
                             suites={treeSuites}
                />
            </Grid>
            <Grid xs={2} item style={{
                backgroundColor: "#eeeeee"
            }}>
                <Grid style={{display: "flex", flexDirection: "column"}}>
                    <Grid style={{textAlign: "center",}}>
                        <Button style={{
                            margin: 15,
                            minWidth: "70%",
                            height: "45%",
                            backgroundColor: "#FFFFFF",
                            color: "#000000",
                        }} onClick={handleShowCreationCase}>Создать тест-кейс</Button>
                        <Button style={{
                            minWidth: "70%",
                            height: "45%",
                            backgroundColor: "#696969",
                            color: "#FFFFFF",
                        }} onClick={handleShowCreationSuite}>Создать сьюту</Button>
                        <FolderSuites suites={treeSuites}/>
                        {suites.length > 0 &&
                        <CreationCase show={showCreationCase} setShow={setShowCreationCase} suites={suites}
                                      selectedSuiteCome={selectedSuiteCome}/>}
                        <CreationSuite show={showCreationSuite} setShow={setShowCreationSuite} suites={suites}
                                       selectedSuiteCome={selectedSuiteCome}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
}

export default SuitesComponent
