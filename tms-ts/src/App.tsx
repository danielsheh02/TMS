import React from "react";
import './App.css';
import {Grid} from "@mui/material";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import TestCases from "./testcases/testcases";
import ProjectPage from "./pages/ProjectPage";


function App() {
    return (
        <Grid>
            <Grid>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<ProjectPage/>}/>
                        <Route path={"/testcases"} element={<TestCases/>}/>
                    </Routes>
                </BrowserRouter>
            </Grid>

        </Grid>
    );
}

export default App;
