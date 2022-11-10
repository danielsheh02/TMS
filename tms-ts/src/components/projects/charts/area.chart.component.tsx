import React from 'react';
import {CartesianGrid, Legend, Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {areaData} from "../dataExample";

const AreaChartComponent: React.FC = () => {
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