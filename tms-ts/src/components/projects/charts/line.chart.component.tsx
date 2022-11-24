import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {test} from "../../models.interfaces";
import moment from "moment/moment";

const LineChartComponent = (props: {
    tests: test[]
}) => {
    const sliceOfTests = props.tests.slice(0, 100)
    sliceOfTests.sort((a, b) =>
        moment(b.updated_at, "YYYY-MM-DDThh:mm").valueOf() - moment(a.updated_at, "YYYY-MM-DDThh:mm").valueOf())
    const result: { [key: string]: number; }[] = []
    const dates: string[] = []
    sliceOfTests.forEach((test) => {
        const testDate = moment(test.updated_at, "YYYY-MM-DDThh:mm").format("DD/MM/YYYYY")
        if (dates[dates.length - 1] !== testDate) {
            const currentResult: { [key: string]: number; } = {
                failed: 0,
                passed: 0,
                skipped: 0,
                retest: 0
            }
            currentResult[test.current_result?.status]++
            result.push({
                failed: currentResult.failed,
                passed: currentResult.passed,
                skipped: currentResult.skipped,
                retest: currentResult.retest
            })
            if (testDate) {
                dates.push(testDate)
            }
        } else {
            result[result.length - 1][test.current_result?.status]++
        }
    })
    const lineData = dates.map((value, index): { [key: string]: number | string | undefined; } => {
            return {
                name: value,
                failed: result[index].failed,
                passed: result[index].passed,
                skipped: result[index].skipped,
                retest: result[index].retest
            }
        }
    )


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