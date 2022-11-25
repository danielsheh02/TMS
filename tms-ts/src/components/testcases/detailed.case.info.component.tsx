import React from "react";
import {myCase} from "./suites.component";
import {Divider, Grid, Typography} from "@mui/material";

interface Props {
    myCase: myCase
}

const DetailedCaseInfo: React.FC<Props> = ({myCase}) => {
    return (
        <Grid style={{padding: 20, wordBreak: "break-word"}}>
            <Grid >
                <Typography variant="h6">
                    Название
                </Typography>
                <Grid>
                    {myCase.name}
                </Grid>
                <Divider style={{margin: "10px 0px 10px 0px"}}/>
            </Grid>
            <Grid >
                <Typography variant="h6">
                    Описание
                </Typography>
                <Grid>
                    {myCase.scenario}
                </Grid>
                <Divider style={{margin: "10px 0px 10px 0px"}}/>
            </Grid>
            {myCase.setup && <Grid >
                <Typography variant="h6">
                    Предусловие
                </Typography>
                <Grid>
                    {myCase.setup}
                </Grid>
                <Divider style={{margin: "10px 0px 10px 0px"}}/>
            </Grid>}
            {myCase.teardown && <Grid >
                <Typography variant="h6">
                    Постусловие
                </Typography>
                <Grid>
                    {myCase.teardown}
                </Grid>
                <Divider style={{margin: "10px 0px 10px 0px"}}/>
            </Grid>}
            {myCase.estimate && <Grid >
                <Typography variant="h6">
                    Время выполнения
                </Typography>
                <Grid>
                    {myCase.estimate}
                </Grid>
                <Divider style={{margin: "10px 0px 10px 0px"}}/>
            </Grid>}
        </Grid>
    )
}

export default DetailedCaseInfo