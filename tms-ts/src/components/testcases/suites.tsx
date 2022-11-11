import {
    Button, Grid
} from "@material-ui/core";
import React, {useState} from "react";
import useStyles from "../../styles/styles";
import CreationCase from "./creation.case.component";
import CreationSuite from "./creation.suite.component";
import TableSuites from "./table.suites.component";


const SuitesComponent: React.FC = () => {
    const classes = useStyles()
    const [showCreationCase, setShowCreationCase] = useState(false)
    const [showCreationSuite, setShowCreationSuite] = useState(false)
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const handleShowCreationCase = () => setShowCreationCase(true)

    const handleShowCreationSuite = () => setShowCreationSuite(true)
    return (
        <Grid container style={{
            marginTop: 0,
            position: "absolute",
            height: "91%",
            width: "100%"
        }}>
            <Grid xs={10} item >
                <TableSuites selected={selected} setSelected={setSelected}
                             setShowCreationCase={setShowCreationCase}
                             setShowCreationSuite={setShowCreationSuite}
                />
            </Grid>
            <Grid xs={2} item style={{
                backgroundColor: "#eeeeee"
            }}>
                <Grid style={{ display: "flex", flexDirection: "column"}}>
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
                        <CreationCase show={showCreationCase} setShow={setShowCreationCase}/>
                        <CreationSuite show={showCreationSuite} setShow={setShowCreationSuite}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
}

export default SuitesComponent