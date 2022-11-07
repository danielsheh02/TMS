import React from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {pieData} from "../dataExample";

const PieChartComponent: React.FC = () => {
    return (
        <ResponsiveContainer height={200}>
            <PieChart>
                <Pie data={pieData} dataKey={"value"} labelLine={true}>
                    <Cell fill={"#98d589"}/>
                    <Cell fill={"#d99292"}/>
                    <Cell fill={"#ce7655"}/>
                    <Cell fill={"#8884d8"}/>
                </Pie>
                <Legend/>
                <Tooltip formatter={(value, name) => ["Тестов назначено -- " + value, name]}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;