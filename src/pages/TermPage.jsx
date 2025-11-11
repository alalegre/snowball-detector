import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router';

import './TermPage.css'

// Components
import { ClassCard } from '../components/TermPage/ClassCard';
import { StudyLogs } from '../components/TermPage/StudyLogs';
import { FlaggedClasses } from '../components/TermPage/FlaggedClasses';
import { StudyChart } from '../components/TermPage/StudyChart';
import { supabase } from '../client';
import { Header } from '../components/Header';


export const TermPage = () => {
    const { termID } = useParams();
    const [classesData, setClassesData] = useState([]);
    const [term, setTerm] = useState({});
    const [sessions, setSessions] = useState([]);

    // Compute only when log sessions change or when a class is added/deleted
    const { chartData, totalHours, toleranceMargin, averageHours } = useMemo(() => {
        const chartData = classesData.map(cls => {
            const total = sessions
                .filter(session => session.class_id === cls.class_id)
                .reduce((sum, session) => sum + session.num_hours, 0);
            return { class_name: cls.class_name, totalClassHours: total }
        });

        // Compute hours from log data
        const nonZeroClasses = chartData.filter(entry => entry.totalClassHours > 0);
        const totalHours = nonZeroClasses.reduce((total, entry) => total + entry.totalClassHours, 0);

        const averageHours = nonZeroClasses.length > 0 ? totalHours / chartData.length : 0;
        const toleranceMargin = averageHours * 0.7;
        return { chartData, totalHours, toleranceMargin, averageHours }
    }, [sessions, classesData])

    // Compare each class hours to average and flag if needed
    const { flaggedClasses, flagForSnowball } = useMemo(() => {
        if (chartData.length === 0) {
            return { flaggedClasses: [], flagForSnowball: false }
        }
        const belowAverage = chartData.filter(entry => entry.totalClassHours < toleranceMargin && entry.totalClassHours !== 0);

        const flaggedClasses = belowAverage
            .filter(entry => entry.totalClassHours > 0)  // Ignores classes with 0 hours
            .map(entry => entry.class_name)

        return {
            flaggedClasses,
            flagForSnowball: flaggedClasses.length > 0,
        }
    }, [chartData, toleranceMargin, sessions])

    // Fetch data from supabase at first render
    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await supabase
                .from('classes')
                .select()
                .eq('term_id', termID)
            setClassesData(data)
        }
        fetchClasses().catch(console.error);
    }, [termID]);

    useEffect(() => {
        const fetchTermData = async () => {
            const { data } = await supabase
                .from('terms')
                .select()
                .eq('term_id', termID)
            setTerm(data[0]);
        }
        fetchTermData().catch(console.error)
    }, [termID])

    useEffect(() => {
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('logs')
                .select()
                .eq('term_id', termID)
                .order('date', { ascending: false });
            if (!error) {
                setSessions(data);
            }
        }
        fetchLogs().catch(console.error);
    }, [termID])

    // -- Handlers --
    const handleDeleteLog = async (index) => {
        const logToDelete = sessions[index].log_id;

        // Update the log list
        await supabase
            .from('logs')
            .delete()
            .eq('log_id', logToDelete);

        // Update local state
        setSessions(prev => prev.filter(log => log.log_id !== logToDelete));
    }

    const handleAddLog = async (newLog) => {
        const { data } = await supabase
            .from('logs')
            .insert({
                term_id: termID,
                class_id: newLog.class_id,
                class_name: newLog.class_name,
                topic: newLog.topic,
                num_hours: newLog.num_hours,
                notes: newLog.notes
            })
            .select();

        // Update local state
        setSessions(prev => [...data, ...prev]);
    }

    const handleAddClass = async () => {
        // Re-fetch data for UI update without page refresh
        const { data } = await supabase
            .from('classes')
            .select()
            .eq('term_id', termID)

        // Update local state
        setClassesData(data)
    }


    return (
        <div className="TermPage">
            <Header term={term} />
            {/* <hr></hr> */}

            <div className="termpage-container">
                <div className="left-side">
                    <StudyChart
                        chartData={chartData}
                        totalHours={totalHours}
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
