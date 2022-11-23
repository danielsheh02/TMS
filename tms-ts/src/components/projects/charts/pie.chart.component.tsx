import React, {useState} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import axiosTMS from "../../../services/axiosTMS";
import {test} from "../../models.interfaces";

const PieChartComponent: React.FC = () => {
    const [tests, setTests] = useState<test[]>([])
    axiosTMS.get("api/v1/tests/").then((response) => {
        setTests(response.data)
    })
        .catch((e) => {
            console.log(e);
        });
    let nTestsWithoutUser = 0
    tests.forEach((test) => {
        if (test.user == null) {
            nTestsWithoutUser++
        }
    })
    const pieData = [
        {name: 'Назначено', value: tests.length - nTestsWithoutUser},
        {name: 'Не назначено', value: nTestsWithoutUser},
    ];

    return (
        <ResponsiveContainer height={200}>
            <PieChart>
                <Pie data={pieData} dataKey={"value"} labelLine={true}>
                    <Cell fill={"#98d589"}/>
                    <Cell fill={"#d99292"}/>
                </Pie>
                <Legend/>
                <Tooltip formatter={(value, name) => ["Тестов назначено -- " + value, name]}/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;