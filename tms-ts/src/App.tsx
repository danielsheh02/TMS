import React from "react";
import './App.css';
import {Button, Grid} from "@mui/material";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import TestCases from "./testcases/testcases";


function App() {
    return (
        <Grid>
            <Grid>

                <Button href="/testcases">
                    Тест кейсы
                </Button>

            </Grid>
            <Grid>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/testcases"} element={<TestCases/>}/>
                    </Routes>
                </BrowserRouter>
            </Grid>

        </Grid>
    );
}

export default App;
