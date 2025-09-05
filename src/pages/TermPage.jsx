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
    const [chartData, setChartData] = useState(() => {  // Will store data in {className: 'class_name', totalClassHours: number} format
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

    // -- Utilities --
    const saveSessions = (sessions) => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
    }

    const saveChartData = (chartData) => {
        localStorage.setItem("chartData", JSON.stringify(chartData));
    }

    // -- Handlers --
    const handleDeleteLog = (index) => {
        // Get hours and className from row first before deleting it
        const hoursToDelete = sessions[index].hoursStudied;
        const classToDelete = sessions[index].className;

        // Update total hours in chartData accordingly
        setChartData(prevChartData => prevChartData.map(entry =>
            entry.className === classToDelete
                ? { ...entry, totalClassHours: entry.totalClassHours - hoursToDelete }
                : entry
        ))

        // Update the log list
        const updatedSessions = sessions.filter((_, i) => i !== index);  // Create new array by filtering out the old
        setSessions(updatedSessions);
    }

    const handleAddLog = (newLog) => {
        setSessions(prevSessions => [newLog, ...prevSessions]);  // Newly added log gets added on top
        setChartData(prevChartData => {
            // Check if the class exists in the chart
            const classExist = prevChartData.find(entry => entry.className === newLog.className);

            if (classExist) {
                // Map through array and update total hours
                return prevChartData.map(entry =>  // Create a new array with new values
                    entry.className === newLog.className
                        ? { ...entry, totalClassHours: entry.totalClassHours + newLog.hoursStudied }  // Add current entry with updated hours
                        : entry  // Return as-is with no changes
                )
            } else {
                // Add a new entry to the array
                return [...prevChartData, { className: newLog.className, totalClassHours: newLog.hoursStudied }];
            }
        });
    }


    // Deletes a class from the list if there's 0 study hours
    useEffect(() => {
        const updatedSessions = sessions.filter(sesh => sesh.hoursStudied !== 0);
        setSessions(updatedSessions);
        saveSessions(updatedSessions)

        const updatedChartData = chartData.filter(x => x.totalClassHours !== 0);
        setChartData(updatedChartData);
        saveChartData(updatedChartData);
    }, [totalHours])

    // Flags classes that need attention
    useEffect(() => {
        // Get total hours for all classes
        let sum = 0;
        if (chartData.length > 0) {
            for (let i = 0; i < chartData.length; i++) {
                sum += chartData[i].totalClassHours;
            }
        }
        setTotalHours(sum);

        // Set average hours spent
        const averageHours = chartData.length > 0 ? sum / chartData.length : 0;
        const toleranceMargin = averageHours * 0.8;
        setAverageHours(toleranceMargin);

        // Compare each class hours to average and flag if needed
        if (chartData.length > 1) {
            const belowAverage = chartData.filter(entry => entry.totalClassHours < toleranceMargin);
            setFlagForSnowball(belowAverage.length > 0);
            setFlaggedClasses(belowAverage.map(entry => entry.className));
        }
    }, [chartData]);


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
                        average={averageHours}
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
                        onDeleteLog={handleDeleteLog}
                        onAddLog={handleAddLog}
                    />
                </div>
            </div>
        </div>
    )
}
