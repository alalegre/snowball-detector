import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router';

import './TermPage.css'

// Components
import { ClassCard } from '../components/TermPage/ClassCard';
import { StudyLogs } from '../components/TermPage/StudyLogs';
import { FlaggedClasses } from '../components/TermPage/FlaggedClasses';
import { StudyChart } from '../components/TermPage/StudyChart';
import { supabase } from '../client';


export const TermPage = () => {
    // Acquires the term passed from Home.jsx
    const { termID } = useParams();
    const [classesData, setClassesData] = useState([]);
    const [term, setTerm] = useState({})
    const [totalHours, setTotalHours] = useState(0);
    const [averageHours, setAverageHours] = useState(0);
    const [flaggedClasses, setFlaggedClasses] = useState([]);
    const [flagForSnowball, setFlagForSnowball] = useState(false);

    const [sessions, setSessions] = useState([]);


    // Fetch data from supabase    
    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await supabase
                .from('classes')
                .select()
                .eq('term_id', termID)
            setClassesData(data)
            console.log("classesData:", data)
        }
        fetchClasses().catch(console.error);
    }, []);

    useEffect(() => {
        const fetchTermData = async () => {
            const { data } = await supabase
                .from('terms')
                .select()
                .eq('term_id', termID)
            setTerm(data[0]);
        }
        fetchTermData().catch(console.error)
    }, [])

    useEffect(() => {
        const fetchLogs = async () => {
            const { data } = await supabase
                .from('logs')
                .select()
                .order('date', { ascending: false });
            setSessions(data);
        }
        fetchLogs().catch(console.error);
    }, [])


    // Data for charts
    const [chartData, setChartData] = useState(() => {  // Will store data in {className: 'class_name', totalClassHours: number} format
        try {
            return JSON.parse(localStorage.getItem("chartData")) || [];
        } catch {
            return [];
        }
    });




    // Used to keep track of logs
    // const [sessions, setSessions] = useState(() => {
    //     try {
    //         return JSON.parse(localStorage.getItem("sessions")) || [];
    //     } catch {
    //         return [];
    //     }
    // });




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

    const handleAddLog = async (newLog) => {
        // setSessions(prevSessions => [newLog, ...prevSessions]);  // Newly added log gets added on top
        await supabase
            .from('logs')
            .insert({ class_id: newLog.class_id, class_name: newLog.className, topic: newLog.topic, num_hours: newLog.hoursStudied, date: newLog.date, notes: newLog.notes })
            .select()

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

    const handleAddClass = async () => {
        // Re-fetch data for UI update without page refresh
        const { data } = await supabase
            .from('classes')
            .select()
            .eq('term_id', termID)
        setClassesData(data)
    }




    // Flags classes that need attention
    useEffect(() => {
        // Get total hours for all classes
        const sum = chartData.reduce((total, entry) => total + entry.totalClassHours, 0);
        setTotalHours(sum);

        // Set average hours spent
        const averageHours = chartData.length > 0 ? sum / chartData.length : 0;
        const toleranceMargin = averageHours * 0.7;
        setAverageHours(toleranceMargin);

        // Compare each class hours to average and flag if needed
        if (chartData.length >= 1) {
            const belowAverage = chartData.filter(entry => entry.totalClassHours < toleranceMargin);

            setFlagForSnowball(belowAverage.length > 0);
            setFlaggedClasses(belowAverage.map(entry => entry.className));

        }
    }, [chartData]);




    // Deletes a class from the list if there's 0 study hours
    useEffect(() => {
        const updatedSessions = sessions.filter(sesh => sesh.hoursStudied !== 0);
        setSessions(updatedSessions);
        saveSessions(updatedSessions)

        const updatedChartData = chartData.filter(x => x.totalClassHours !== 0);
        setChartData(updatedChartData);
        saveChartData(updatedChartData);
    }, [totalHours])





    return (
        <div className="TermPage">
            <h1>{term.term_name}</h1>
            <p>{term.term_duration}</p>
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
                    <ClassCard
                        classesData={classesData}
                        termID={termID}
                        handleAddClass={handleAddClass}
                    />
                    <StudyLogs
                        sessions={sessions}
                        classesData={classesData}
                        onDeleteLog={handleDeleteLog}
                        onAddLog={handleAddLog}
                    />
                </div>
            </div>
        </div>
    )
}
