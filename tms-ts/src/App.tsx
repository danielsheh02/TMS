import React from "react";
import './App.css';
import {Route, Routes} from "react-router-dom";
import Suites from "./components/testcases/suites.component";
import Projects from "./components/projects/projects";
import Header from "./components/header";
import Login from "./components/login"
import ProjectSelection from "./components/projects/project-selection";
import NotExist from "./components/not-exist";


function App() {
    return (
        <div>
            {/*{window.location.pathname !== '/login' && */}
            <Header/>
            {/*}*/}
            <Routes>
                <Route path={"/"} element={<ProjectSelection/>}/>
                <Route path={"/project"} element={<Projects/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/testcases"} element={<Suites/>}/>
                <Route path={"*"} element={<NotExist/>}/>
            </Routes>

        </div>
    );
}

export default App;
