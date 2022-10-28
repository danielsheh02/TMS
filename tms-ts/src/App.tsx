import React from "react";
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import TestCases from "./testcases/testcases";
import ProjectPage from "./pages/ProjectPage";
import Header from "./components/Header";


function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<ProjectPage/>}/>
                    <Route path={"/testcases"} element={<TestCases/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
