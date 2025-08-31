import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useLocation } from 'react-router';

// import '../App.css'
import './TermPage.css'
import { Modal } from '../components/Modal';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


export const TermPage = () => {
    const { termID } = useParams();
    const [isOpen, setIsOpen] = useState(false);  // Used for modal
    const [totalHours, setTotalHours] = useState(0);
    const [averageHours, setAverageHours] = useState(0);
    const [flaggedClasses, setFlaggedClasses] = useState([]);

    // const [averageHours, setAverageHours] = useState(() => {
    //     try {
    //         return JSON.parse(localStorage.getItem("averageHour"));
    //     } catch {
    //         return [];
    //     }
    // })
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

    // Acquires the term passed from Home.jsx
    const location = useLocation();
    const term = location.state?.term;

    if (!term) {
        return <h2>No term data available for {termID}</h2>;
    }

    // State for getting information from form
    const [formData, setFormData] = useState({
        className: '',
        topic: '',
        hoursStudied: 1,
        studyDate: '',
        notes: 'N/A',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: name === "hoursStudied" ? parseInt(value, 10) || 0 : value,  // Converts only 'hoursStudied' value into int
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setSessions(prevSessions => [formData, ...prevSessions]);

        // Clear out the fields
        setFormData({
            className: '',
            topic: '',
            hoursStudied: 1,
            studyDate: '',
            notes: 'N/A',
        })

        setChartData(prevChartData => {
            // Check if the class exists in the chart
            const classExist = prevChartData.find(entry => entry.className === formData.className);

            if (classExist) {
                // Map through array and update total hours
                return prevChartData.map(entry =>
                    entry.className === formData.className
                        ? { ...entry, totalClassHours: entry.totalClassHours + formData.hoursStudied }  // Create new array with updated hours
                        : entry  // Return as-is with no changes
                )
            } else {
                // Add a new entry
                return [...prevChartData, { className: formData.className, totalClassHours: formData.hoursStudied }];
            }

        });
        setIsOpen(false);
    }

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions));
        localStorage.setItem("chartData", JSON.stringify(chartData));
    }, [sessions])

    const clearLogs = () => {
        localStorage.clear();
        window.location.reload();
    }

    const deleteLog = (index) => {
        // Get hours and className from row first before deleting it
        const hoursToDelete = sessions[index].hoursStudied;
        const classToDelete = sessions[index].className;

        // Update total hours in chartData accordingly
        setChartData(prevChartData => {
            return prevChartData.map(entry =>
                entry.className === classToDelete
                    ? { ...entry, totalClassHours: entry.totalClassHours - hoursToDelete }
                    : entry
            )
        })
        localStorage.setItem("chartData", JSON.stringify(chartData))

        // Update the log list
        const updatedSessions = sessions.filter((_, i) => i !== index);  // Create new array by filtering out the old
        setSessions(updatedSessions);
        localStorage.setItem("sessions", JSON.stringify(updatedSessions));

        window.location.reload();
    }

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
        if (chartData.length <= 1) {
            setAverageHours(totalHours);
        } else {
            setAverageHours(totalHours / chartData.length);
        }

        // Compare each class hours to average and flag if needed
        if (chartData.length > 1) {
            for (let i = 0; i < chartData.length; i++) {
                if (chartData[i].totalClassHours < averageHours) {
                    setFlagForSnowball(true);
                    setFlaggedClasses();
                }
            }
        }

        console.log(flaggedClasses);
    }, [chartData, totalHours])

    // calculate average
    // compare average to total hours of each class
    // show which class needs more attention





    return (
        <div className="TermPage">
            <h1>{term.name}</h1>
            <p>{term.termDuration}</p>
            <hr></hr>

            <div className="termpage-container">
                <div className="left-side">
                    {/* Pie Chart */}
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
                    {flagForSnowball && <p>Flagged!</p>}
                </div>
                <div className="right-side">
                    {/* Replace classList with ClassCard component */}
                    <ul className='classList'>
                        {
                            term.classes.map((className, index) => (
                                <li key={index}>{className}</li>
                            ))
                        }
                        <button className='add-class'>+ Add Class</button>
                    </ul>

                    <h2>Recent Study Logs:</h2>

                    <table className='t-row'>
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Topic</th>
                                <th># hours</th>
                                <th>Date</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session, index) => (
                                <tr className="log-row" key={index} onClick={() => deleteLog(index)}>
                                    <td>{session.className}</td>
                                    <td>{session.topic}</td>
                                    <td>{session.hoursStudied}</td>
                                    <td>{session.studyDate}</td>
                                    <td>{session.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        onSubmit={onSubmit}
                        handleChange={handleChange}
                        formData={formData}
                        classList={term.classes}
                    />
                    <button onClick={clearLogs}>Clear logs</button>

                    <h4 className='add-study' onClick={() => setIsOpen(true)}>+ Add Study Session</h4>
                </div>


            </div>
        </div>
    )
}
