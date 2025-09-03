import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useLocation } from 'react-router';

import './TermPage.css'

// Components
import { ClassCard } from '../components/TermPage/ClassCard';
import { StudyLogs } from '../components/TermPage/StudyLogs';
import { FlaggedClasses } from '../components/TermPage/FlaggedClasses';
import { StudyChart } from '../components/TermPage/StudyChart';


export const TermPage = () => {
    // Acquires the term passed from Home.jsx
    const location = useLocation();
    const term = location.state?.term;
    const { termID } = useParams();

    if (!term) {
        return <h2>No term data available for {termID}</h2>;
    }

    const [totalHours, setTotalHours] = useState(0);
    const [averageHours, setAverageHours] = useState(0);
    const [flaggedClasses, setFlaggedClasses] = useState([]);
    const [flagForSnowball, setFlagForSnowball] = useState(false);

    // Data for charts
    const [chartData, setChartData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("chartData")) || [];
        } catch {
            return [];
        }
    });

    // Used to keep track of logs
    const [sessions, setSessions] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("sessions")) || [];
        } catch {
            return [];
        }
    });

    const saveSessions = (sessions) => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }

    const saveChartData = (chartData) => {
        localStorage.setItem("chartData", JSON.stringify(chartData));
    }

    // Occurs everytime there's a change in the total hours
    useEffect(() => {
        // Deletes a class from the list if there's 0 study hours
        const updatedSessions = sessions.filter((sesh, i) => sesh.hoursStudied !== 0);
        setSessions(updatedSessions);
        saveSessions(updatedSessions)

        const updatedChartData = chartData.filter((x, i) => x.totalClassHours !== 0);
        setChartData(updatedChartData);
        saveChartData(updatedChartData);
    }, [totalHours])

    // Occurs when the table is changed
    useEffect(() => {
        saveSessions(sessions);
        saveChartData(chartData);

        // Get total hours for all classes
        let sum = 0;
        if (chartData.length > 0) {
            for (let i = 0; i < chartData.length; i++) {
                sum += chartData[i].totalClassHours;
            }
        }
        setTotalHours(sum);

        // Set average hours spent
        const average = chartData.length > 0 ? sum / chartData.length : 0;
        setAverageHours(average);

        // Compare each class hours to average and flag if needed
        if (chartData.length > 1) {
            const belowAverage = chartData.filter(entry => entry.totalClassHours < average);
            setFlagForSnowball(true);
            setFlaggedClasses(belowAverage.map(entry => entry.className));
        }
    }, [sessions, chartData])


    return (
        <div className="TermPage">
            <h1>{term.name}</h1>
            <p>{term.termDuration}</p>
            <hr></hr>

            <div className="termpage-container">
                <div className="left-side">
                    <StudyChart
                        chartData={chartData}
                        totalHours={totalHours}
                        averageHours={averageHours}
                    />
                    <FlaggedClasses
                        flaggedClasses={flaggedClasses}
                        flagForSnowball={flagForSnowball}
                    />

                </div>
                <div className="right-side">
                    <ClassCard termClasses={term.classes} />
                    <StudyLogs
                        sessions={sessions}
                        classList={term.classes}
                        setChartData={setChartData}
                        setSessions={setSessions}
                    />
                </div>
            </div>
        </div>
    )
}



// What I can do now to further clean my code and avoid redundancy:

/*
    - Create functions like "handleAddLog" to make sure setSessions and setChartData are private to TermPage
        <StudyLogs 
            sessions={sessions}
            onDeleteLog={handleDeleteLog}
            onClearLogs={handleClearLogs}
            onAddLog={handleAddLog}
        />
*/