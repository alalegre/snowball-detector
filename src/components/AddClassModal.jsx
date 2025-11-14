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
                <img src='../public/close.png' className='exit' onClick={onClose} />
                <img src='../public/open-book.png' className='open-book' />
                <h4>Add a new class</h4>
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

                        <div className="inputs">
                            <div className="classLabel">
                                <label>Class</label>
                                <input
                                    type='text'
                                    name='class_name'
                                    placeholder='Enter your class name'
                                    value={course.class_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="classCodeLabel">
                                <label>Class Code</label>
                                <input
                                    type='text'
                                    name='class_id'
                                    placeholder='e.g. cse30'
                                    value={course.class_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="buttons">
                    <button type="submit">Add Class</button>
                </div>
            </div>
        </>
    )
}
