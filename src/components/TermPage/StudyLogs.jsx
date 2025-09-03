import React, { useState } from 'react'
import { Modal } from './Modal';

export const StudyLogs = ({ sessions, chartData, classList, setChartData, setSessions }) => {
    const [isOpen, setIsOpen] = useState(false);  // Used for modal

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

    return (
        <div className='StudyLogs'>
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
            <button onClick={clearLogs}>Clear logs</button>
            <h4 className='add-study' onClick={() => setIsOpen(true)}>+ Add Study Session</h4>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                classList={classList}
                setChartData={setChartData}
                setSessions={setSessions}
                setIsOpen={setIsOpen}
            />
        </div>
    )
}
