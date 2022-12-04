import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';


const BarChartComponent = (props: { passed: number, failed: number, untested: number }) => {
    const {passed, failed, untested} = props;
    const data = [
        {
            passed: passed,
            failed: failed,
            untested: untested,
        },
    ];
    return (
        <ResponsiveContainer width="100%" aspect={4.0 / 1.3}>
            <BarChart data={data}
                      layout="vertical"
            >
                <XAxis hide type="number"/>
                <YAxis hide dataKey="name" reversed type="category"/>
                {/*<Tooltip />*/}
                <Bar legendType="star" dataKey="passed" barSize={20} stackId="a" fill="#1da900"/>
                <Bar legendType="star" dataKey="failed" stackId="a" fill="#ff0000"/>
                <Bar legendType="star" dataKey="untested" stackId="a" fill="#9f9f9f"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;