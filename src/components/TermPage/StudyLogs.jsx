import React, { useState } from 'react'
import { Modal } from './Modal';

export const StudyLogs = ({ sessions, classList, onDeleteLog, onAddLog }) => {
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
                            <td>{session.className}</td>
                            <td>{session.topic}</td>
                            <td>{session.hoursStudied}</td>
                            <td>{session.studyDate}</td>
                            <td>{session.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onClearLogs}>Clear logs</button>
            <h4 className='add-study' onClick={() => setIsOpen(true)}>+ Add Study Session</h4>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                classList={classList}
                onAddLog={onAddLog}
            />
        </div>
    )
}
