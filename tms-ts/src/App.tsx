import React from "react";
import './App.css';
import {Grid} from "@mui/material";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import TestCases from "./testcases/testcases";
import Header from "./components/Header";


function App() {
    return (
        <Grid>
            <Grid>
                <Header/>
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
