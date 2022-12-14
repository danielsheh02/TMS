import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import React, {useState} from "react";
import SuiteCaseService from "../../services/suite.case.service";
import {treeSuite} from "./suites.component";

function DeletionDialogElements(props: {
    openDialogDeletion: boolean, setOpenDialogDeletion: (show: boolean) => void,
    selectedForDeletion: number[],
    setTreeSuites: (treeSuites: treeSuite[]) => void,
}) {
    const {openDialogDeletion, setOpenDialogDeletion, selectedForDeletion, setTreeSuites} = props
    console.log(selectedForDeletion)

    function disagreeToDelete() {
        setOpenDialogDeletion(false)
    }

    function agreeToDelete() {
        // if (componentForDeletion.type == "case")
        //     SuiteCaseService.deleteCase(componentForDeletion.id).then(() => {
        //         SuiteCaseService.getTreeSuites().then((response) => {
        //             setTreeSuites(response.data)
        //         })
        //     })
        // else {
        //     SuiteCaseService.deleteSuite(componentForDeletion.id).then(() => {
        //         SuiteCaseService.getTreeSuites().then((response) => {
        //             setTreeSuites(response.data)
        //         })
        //     })
        // }
        setOpenDialogDeletion(false)
    }

    return (
        <Dialog
            open={openDialogDeletion}
            onClose={disagreeToDelete}
        >
            <DialogContent>
                <DialogContentText style={{fontSize: 20, color: "black", whiteSpace: "pre"}}>
                    Вы уверены, что хотите удалить выбранные тест-кейсы?
                    <br/>
                </DialogContentText>
                <DialogActions style={{padding: 0}}>
                    <Button
                        style={{
                            margin: "20px 4px 0px 5px",
                            width: "30%",
                            minWidth: 100,
                            height: "30%",
                            backgroundColor: "#FFFFFF",
                            border: '1px solid',
                            color: "#000000",
                        }}
                        onClick={disagreeToDelete}
                        title={"Нет"}>
                        Нет
                    </Button>
                    <Button
                        style={{
                            margin: "20px 5px 0px 4px",
                            width: "30%",
                            minWidth: 100,
                            height: "30%",
                            backgroundColor: "#696969",
                            color: "#FFFFFF",
                        }}
                        onClick={agreeToDelete}
                        title={"Да"}>
                        Да
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default DeletionDialogElements