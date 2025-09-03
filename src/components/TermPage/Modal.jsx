import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './Modal.css'

export const Modal = ({ open, onClose, children, classList, setChartData, setSessions, setIsOpen }) => {
    if (!open) return null;

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

    return ReactDom.createPortal(
        <>
            <div className="overlay" />
            <div className='Modal'>
                <div className="form">
                    <form className='form' onSubmit={onSubmit}>
                        <label>enter class name:</label>
                        <select
                            value={formData.className}
                            onChange={handleChange}
                            name='className'
                            required
                        >
                            <option value="" defaultValue disabled="disabled">-- Select Class --</option>
                            {classList.map((className, index) => (
                                <option key={index} value={className}>{className}</option>
                            ))}
                        </select>

                        <label>enter topic:</label>
                        <input
                            type='text'
                            name='topic'
                            placeholder='enter topic...'
                            value={formData.topic}
                            onChange={handleChange}
                            required
                        />

                        <label>enter hours of studied:</label>
                        <input
                            type='number'
                            min="1"
                            name='hoursStudied'
                            placeholder='enter hours of studied...'
                            value={formData.hoursStudied}
                            onChange={handleChange}
                        />

                        <label>enter date of study:</label>
                        <input
                            type='text'
                            name='studyDate'
                            placeholder='enter date of study...'
                            value={formData.studyDate}
                            onChange={handleChange}
                            required
                        />

                        <label>enter notes:</label>
                        <input
                            type='text'
                            name='notes'
                            placeholder='enter notes...'
                            value={formData.notes}
                            onChange={handleChange}
                        />

                        <input type='submit' value='Submit' />
                    </form>
                </div>

                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>,
        document.getElementById('portal')  // Renders outside parent dom to prevent issues
    )
}
