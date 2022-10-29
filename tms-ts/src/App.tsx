import React from "react";
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import SuitesComponent from "./components/testcases/suites.component";
import ProjectPage from "./components/projects/ProjectPage";
import Header from "./components/Header";
import Login from "./components/Login"
import ProjectSelectionPage from "./components/projects/ProjectSelectionPage";


function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<ProjectSelectionPage/>}/>
                    <Route path={"/project"} element={<ProjectPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/testcases"} element={<SuitesComponent/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
