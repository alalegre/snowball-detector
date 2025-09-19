import React, { useState } from 'react'
import { StudyLogModal } from './StudyLogModal';

import './StudyLogs.css'

export const StudyLogs = ({ sessions, classesData, onDeleteLog, onAddLog }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClearLogs = () => {
        localStorage.clear();
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
                        <tr className="log-row" key={index} onClick={() => onDeleteLog(index)}>
                            <td>{session.class_name}</td>
                            <td>{session.topic}</td>
                            <td>{session.num_hours}</td>
                            <td>{session.date}</td>
                            <td>{session.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="buttons">
                <h4 className='add-study-button' onClick={() => setIsOpen(true)}>+ Add Study Session</h4>
                <h4 className='clear-logs-button' onClick={onClearLogs}>Clear Logs</h4>
            </div>

            <StudyLogModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                classesData={classesData}
                onAddLog={onAddLog}
            />
        </div>
    )
}
