import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {testsData} from "../dataExample";

const LineChartComponent: React.FC = () => {
    const lineData = testsData.map(([, , passed, skipped, failed, retest, date]) => {
        return {
            name: date,
            failed: failed,
            passed: passed,
            skipped: skipped,
            retest: retest
        }
    })

    return (
        <ResponsiveContainer height={200}>
            <LineChart data={lineData}>
                <CartesianGrid/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line name={"Passed"} type="monotone" dataKey="passed" stroke={"#12ab00"} strokeWidth={3} dot={false}/>
                <Line name={"Failed"} type="monotone" dataKey="failed" stroke={"#b90000"} strokeWidth={3} dot={false}/>
                <Line name={"Skipped"} type="monotone" dataKey="skipped" stroke={"#e0d729"}
                      strokeWidth={3} dot={false}/>
                <Line name={"Retest"} type="monotone" dataKey="retest" stroke={"#646464"} strokeWidth={3} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;