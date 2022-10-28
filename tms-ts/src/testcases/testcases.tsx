import {
    Button, Grid
} from "@material-ui/core";
import React, {useState} from "react";
import useStyles from "../styles/styles";
import CreationCase from "./creation.case.component";
import CreationSuite from "./creation.suite.component";
import Header from "../components/Header";


const TestCases: React.FC = () => {
    const classes = useStyles()
    const [showCreationCase, setShowCreationCase] = useState(false)
    const [showCreationSuite, setShowCreationSuite] = useState(false)

    const handleShowCreationCase = () => setShowCreationCase(true)

    const handleShowCreationSuite = () => setShowCreationSuite(true)

    return (
        <Grid>
            <Button className={classes.button} onClick={handleShowCreationCase}>Создать тест-кейс</Button>
            <Button className={classes.button} onClick={handleShowCreationSuite}>Создать сьюту</Button>
            <CreationCase show={showCreationCase} setShow={setShowCreationCase}/>
            <CreationSuite show={showCreationSuite} setShow={setShowCreationSuite}/>
        </Grid>
    )
        ;
}

export default TestCases
