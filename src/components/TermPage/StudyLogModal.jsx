import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import './StudyLogModal.css'

export const StudyLogModal = ({ open, onClose, classesData, onAddLog }) => {
    if (!open) return null;

    // State for getting information from form
    const [formData, setFormData] = useState({
        class_name: '',
        class_id: '',
        topic: '',
        num_hours: 1,
        notes: 'N/A',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "class_name") {
            const selectedClass = classesData.find(cls => cls.class_name === value);
            setFormData({
                ...formData,
                class_name: value,
                class_id: selectedClass.class_id,
            });
        } else {
            setFormData({
                ...formData,
                [name]: name === "num_hours" ? parseInt(value, 10) : value,  // Converts only 'num_hours' value into int
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddLog(formData);

        setFormData({
            class_name: '',
            class_id: '',
            topic: '',
            num_hours: 1,
            notes: 'N/A',
        });

        onClose();
    }

    return ReactDom.createPortal(
        <>
            <div className="overlay" />
            <div className='Modal'>
                <form className='form' onSubmit={handleSubmit}>
                    <label>enter class name:</label>
                    <select
                        value={formData.class_name}
                        onChange={handleChange}
                        name='class_name'
                        required
                    >
                        <option value="" defaultValue disabled="disabled">-- Select Class --</option>
                        {classesData && classesData.map((cls) => (
                            <option key={cls.class_id} value={cls.class_name}>{cls.class_name}</option>
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
                        name='num_hours'
                        placeholder='enter hours of studied...'
                        value={formData.num_hours}
                        onChange={handleChange}
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

                <button onClick={onClose}>Close Modal</button>
            </div>
        </>,
        document.getElementById('portal')  // Renders outside parent dom to prevent issues
    )
}
