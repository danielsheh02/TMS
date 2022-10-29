import React from "react";
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import TestCases from "./testcases/testcases";
import ProjectPage from "./pages/ProjectPage";
import Header from "./components/Header";
import Login from "./components/Login"
import ProjectSelectionPage from "./pages/ProjectSelectionPage";


function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<ProjectSelectionPage/>}/>
                    <Route path={"/project"} element={<ProjectPage/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/testcases"} element={<TestCases/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
