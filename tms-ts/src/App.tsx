import React from "react";
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Suites from "./components/testcases/suites.component";
import Projects from "./components/projects/projects";
import Header from "./components/header";
import Login from "./components/login"
import ProjectSelection from "./components/projects/project-selection";
import NotExist from "./components/not-exist";
import TestPlansComponent from "./components/testplans/testplans.component";
import AuthService from "./services/Authorization/auth.service";


function App() {
    const token = AuthService.getCurrentAccessToken()
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={"/login"} element={token ? <Navigate to="/"/> : <Login/>}/>
                <Route path={"/"} element={token ? <ProjectSelection/> : <Navigate to="/login"/>}/>
                <Route path={"/project"} element={token ? <Projects/> : <Navigate to="/login"/>}/>
                <Route path={"/testcases"} element={token ? <Suites/> : <Navigate to="/login"/>}/>
                <Route path={"/testplans"} element={token ? <TestPlansComponent/> : <Navigate to="/login"/>}/>
                <Route path={"*"} element={token ? <NotExist/> : <Navigate to="/login"/>}/>
            </Routes>
        </div>
    );
}

export default App;
