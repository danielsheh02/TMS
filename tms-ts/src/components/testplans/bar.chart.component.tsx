import React from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const BarChartComponent = (props: {passed: number, failed: number, untested: number}) => {
    const {passed, failed, untested} = props;
    const data = [
        {
            passed: passed,
            failed: failed,
            untested: untested,
        },
        ];
    return (
        // <ResponsiveContainer width="100%" height="100%">
        //     <BarChart
        //         width={500}
        //         height={300}
        //         data={data}
        //         margin={{
        //             top: 20,
        //             right: 30,
        //             left: 20,
        //             bottom: 5,
        //         }}
        //     >
        //         <CartesianGrid strokeDasharray="3 3"/>
        //         <XAxis axisLine={false}/>
        //         <YAxis axisLine={false} dataKey="name"/>
        //         <Tooltip/>
        //         <Bar dataKey="pv" stackId="a" fill="#8884d8"/>
        //         <Bar dataKey="uv" stackId="a" fill="#82ca9d"/>
        //     </BarChart>
        // </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={4.0 / 1.3}>
            <BarChart data={data}
                layout="vertical"
            >
                <XAxis hide type="number" />
                <YAxis hide dataKey="name" reversed type="category"/>
                {/*<Tooltip />*/}
                <Bar legendType="star" dataKey="passed" barSize={20} stackId="a" fill="#1da900" />
                <Bar legendType="star" dataKey="failed" stackId="a" fill="#ff0000" />
                <Bar legendType="star" dataKey="untested" stackId="a" fill="#9f9f9f" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;