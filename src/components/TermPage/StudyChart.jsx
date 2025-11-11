import React from 'react'
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from 'recharts';

import './StudyChart.css'




export const StudyChart = ({ chartData, totalHours }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className="StudyChart">
            <PieChart width={580} height={580}>
                <Pie
                    dataKey="totalClassHours"
                    nameKey="class_name"
                    isAnimationActive={true}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="85%"
                    cornerRadius="50%"
                    paddingAngle={5}
                    label
                >
                    {chartData.map((cell, index) => (
                        <Cell key={`cell-${cell.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Label position="center" fill="#666">
                    {`${String(totalHours)}h Total Studying`}
                </Label>
                <Legend />

                <Tooltip />
            </PieChart>
        </div>
    )
}
