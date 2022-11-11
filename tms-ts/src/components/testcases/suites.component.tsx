import {
    Button, Grid
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useStyles from "../../styles/styles";
import CreationCase from "./creation.case.component";
import CreationSuite from "./creation.suite.component";
import TableSuites from "./table.suites.component";
import SuiteCaseService from "../../services/suite.case.service";

interface myCase {
    id: number;
    name: string;
    suite: number;
    scenario: string;
    project: number;
    url?: string;
}

interface suite {
    id: number;
    name: string;
    parent: null | number;
    child: null | number;
    project: number;
    url?: string;
    cases: myCase []
}


const SuitesComponent: React.FC = () => {
    const classes = useStyles()
    const [showCreationCase, setShowCreationCase] = useState(false)
    const [showCreationSuite, setShowCreationSuite] = useState(false)
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [suites, setSuites] = useState([])
    const [cases, setCases] = useState([])

    const createTreeStructureSuitesCases = (localSuites: any, localCases: any) => {
        const treeOfSuites: suite [] = []
        const newArray = localSuites.filter((st: suite) => st.parent == null)
        console.log(newArray)
        console.log(localSuites)
    }

    useEffect(() => {
        SuiteCaseService.authorize().then((response) => {
            const token = response.data.access
            SuiteCaseService.getSuites(token).then((response) => {
                const localSuites = response.data
                setSuites(response.data)
                SuiteCaseService.getCases(token).then((response) => {
                    const localCases = response.data
                    setCases(response.data)
                    createTreeStructureSuitesCases(localSuites, localCases)
                })
            })
        })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    const handleShowCreationCase = () => setShowCreationCase(true)

    const handleShowCreationSuite = () => setShowCreationSuite(true)
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
                        {suites.length > 0 &&
                        <CreationCase show={showCreationCase} setShow={setShowCreationCase} suites={suites}/>}
                        <CreationSuite show={showCreationSuite} setShow={setShowCreationSuite} suites={suites}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
}

export default SuitesComponent
