import React, { useState } from 'react'
import { supabase } from '../client';
import './AddClassModal.css'

export const AddClassModal = ({ open, onClose, termID, handleAddClass }) => {

    if (!open) return null;

    const [course, setCourse] = useState({
        class_id: '',
        term_id: '',
        class_name: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourse({
            ...course,
            [name]: value,
        })
    }

    const createClass = async (event) => {
        event.preventDefault();
        await supabase
            .from('classes')
            .insert({ class_id: course.class_id, term_id: termID, class_name: course.class_name })
            .select()
        handleAddClass();
        onClose();
    }

    return (
        <>
            <div className="addclass-overlay" />

            <div className='addClassModal'>
                <div className="form">
                    <form className='formContent' onSubmit={(e) => {
                        e.preventDefault();

                        const form = e.target;
                        if (!form.checkValidity()) {
                            form.reportValidity(); // triggers the native popup
                            return;
                        }

                        createClass();
                    }}>
                        <label>Class:</label>
                        <input
                            type='text'
                            name='class_name'
                            value={course.class_name}
                            onChange={handleChange}
                            required
                        />

                        <label>Class Code:</label>
                        <input
                            type='text'
                            name='class_id'
                            placeholder='e.g. cse30'
                            value={course.class_id}
                            onChange={handleChange}
                            required
                        />
                    </form>
                </div>
                <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type='button' onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )
}
