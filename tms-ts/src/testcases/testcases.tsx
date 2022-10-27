import {
    Button, Grid, Dialog, DialogActions,
    DialogContent, DialogContentText,
} from "@material-ui/core";
import React, {useState} from "react";
import useStyles from "../styles/styles";
import Header from "../components/Header";


const TestCases: React.FC = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Header/>
            <Grid>
                <Button className={classes.button} onClick={handleShow}>Создать тест-кейс</Button>

                <Dialog
                    open={show}
                    onClose={handleClose}
                    classes={{paper: classes.paperCreationTestCase}}
                >
                    <DialogContent>
                        <DialogContentText style={{fontSize: 20, color: "black"}}>
                            Создание тест-кейса
                            <br/>
                        </DialogContentText>
                        <DialogActions>
                            <Button
                                className={classes.button}
                                onClick={handleClose}
                                title={"Нет"}>
                                Нет
                            </Button>
                            <Button className={classes.button}
                                    onClick={handleShow}
                                    title={"Да"}>
                                Да
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

            </Grid>
        </>
    );
}

export default TestCases
