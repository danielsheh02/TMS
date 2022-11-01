import React from 'react';
import {CartesianGrid, Legend, Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";

const AreaChartComponent: React.FC = () => {
    const areaData = [
        {
            name: 'Тест 1',
            result: 4000,
            expected: 2400,
        },
        {
            name: 'Тест 2',
            result: 3000,
            expected: 1398,
        },
        {
            name: 'Тест 3',
            result: 2000,
            expected: 9800,
        },
        {
            name: 'Тест 4',
            result: 2780,
            expected: 3908,
        },
    ];

    return (
        <ResponsiveContainer height={200}>
            <AreaChart data={areaData}>
                <CartesianGrid/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip formatter={(value, name) => [value + " ms", name]}/>
                <Legend/>
                <Area name={"Ожидалось"} type="monotone" dataKey="expected" fill={"#8884d8"}
                      stroke={"#8884d8"}/>
                <Area name={"Результат"} type="monotone" dataKey="result" fill={"#82ca9d"}
                      stroke={"#82ca9d"}/>
            </AreaChart>
        </ResponsiveContainer>

    );
};

export default AreaChartComponent;