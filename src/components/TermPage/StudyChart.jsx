import React from 'react'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


export const StudyChart = ({ chartData, totalHours, averageHours }) => {
    return (
        <div className="StudyChart">
            <PieChart width={500} height={500}>
                <Pie
                    dataKey="totalClassHours"
                    nameKey="className"
                    isAnimationActive={true}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={220}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
            <h4>Total hours: {totalHours}</h4>
            <h5>Average study hours: {averageHours}</h5>
        </div>
    )
}
