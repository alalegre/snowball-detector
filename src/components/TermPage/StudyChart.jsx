import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import './StudyChart.css'

export const StudyChart = ({ chartData, totalHours, average }) => {
    return (
        <div className="StudyChart">
            <PieChart width={680} height={680}>
                <Pie
                    dataKey="totalClassHours"
                    nameKey="className"
                    isAnimationActive={true}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={280}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
            <h4 className='total-hours'>{totalHours}h Total</h4>
            <p>{average}</p>
        </div>
    )
}
