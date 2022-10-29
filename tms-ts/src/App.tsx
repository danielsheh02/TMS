import React from "react";
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import SuitesComponent from "./components/testcases/suites.component";
import ProjectPage from "./pages/ProjectPage";
import Header from "./components/Header";


function App() {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<ProjectPage/>}/>
                    <Route path={"/testcases"} element={<SuitesComponent/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
