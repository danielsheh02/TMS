import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const LineChartComponent: React.FC = () => {
    const lineData = [
        {
            name: '20.10.2022',
            failed: 10,
            passed: 24,
            skipped: 1,
            retest: 0,
        },
        {
            name: '22.10.2022',
            failed: 30,
            passed: 13,
            skipped: 4,
            retest: 10,
        },
        {
            name: '23.10.2022',
            failed: 20,
            passed: 9,
            skipped: 0,
            retest: 3,
        },
        {
            name: '25.10.2022',
            failed: 27,
            passed: 3,
            skipped: 7,
            retest: 15,
        },
        {
            name: '28.10.2022',
            failed: 23,
            passed: 38,
            skipped: 3,
            retest: 7,
        },
    ];

    return (
        <ResponsiveContainer height={200}>
            <LineChart data={lineData}>
                <CartesianGrid/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line name={"Passed"} type="monotone" dataKey="passed" stroke={"#12ab00"} strokeWidth={3}/>
                <Line name={"Failed"} type="monotone" dataKey="failed" stroke={"#b90000"} strokeWidth={3}/>
                <Line name={"Skipped"} type="monotone" dataKey="skipped" stroke={"#e0d729"}
                      strokeWidth={3}/>
                <Line name={"Retest"} type="monotone" dataKey="retest" stroke={"#646464"} strokeWidth={3}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;