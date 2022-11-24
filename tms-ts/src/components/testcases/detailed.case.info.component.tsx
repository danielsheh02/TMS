import React from "react";
import {myCase} from "./suites.component";
import {Grid, Typography} from "@mui/material";

interface Props {
    myCase: myCase
}

const DetailedCaseInfo: React.FC<Props> = ({myCase}) => {
    console.log(myCase)
    return (
        <Grid style={{padding: 20, wordBreak: "break-word"}}>
            <Grid style={{marginBottom: 7}}>
                <Typography variant="h6">
                    Название
                </Typography>
                <Grid>
                    {myCase.name}
                </Grid>
            </Grid>
            <Grid style={{marginBottom: 7}}>
                <Typography variant="h6">
                    Описание
                </Typography>
                <Grid>
                    {myCase.scenario}
                </Grid>
            </Grid>
            {myCase.estimate && <Grid >
                <Typography variant="h6">
                    Время выполнения
                </Typography>
                <Grid>
                    {myCase.scenario}
                </Grid>
            </Grid>}
        </Grid>
    )
}

export default DetailedCaseInfo