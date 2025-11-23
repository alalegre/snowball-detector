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


            <div className='StudyLogModal'>
                <img src='../public/notes.png' className='notes' />
                <img src='../public/close.png' className='exit-studylog' onClick={onClose} />
                <h4>Add a new study session</h4>

                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-inputs">

                        <div className="class-name">
                            <label>Class</label>
                            <select
                                value={formData.class_name}
                                onChange={handleChange}
                                name='class_name'
                                required
                            >
                                <option value="" defaultValue disabled="disabled">— Select Class —</option>
                                {classesData && classesData.map((cls) => (
                                    <option key={cls.class_id} value={cls.class_name}>{cls.class_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="topic"><label>Topic</label>
                            <input
                                type='text'
                                name='topic'
                                placeholder='enter topic...'
                                value={formData.topic}
                                onChange={handleChange}
                                required
                            /></div>


                        <div className="hours-studied"><label>Hours Studied</label>
                            <input
                                type='number'
                                min="1"
                                name='num_hours'
                                placeholder='enter hours of studied...'
                                value={formData.num_hours}
                                onChange={handleChange}
                            /></div>

                        <div className="enter-notes"><label>Notes</label>
                            <input
                                type='text'
                                name='notes'
                                placeholder='enter notes...'
                                value={formData.notes}
                                onChange={handleChange}
                            /></div>

                        <button className="submit-button" type="submit">Add Study Session</button>

                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal')  // Renders outside parent dom to prevent issues
    )
}
