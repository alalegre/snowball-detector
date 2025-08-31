import React from 'react'
import './Form.css'

export const Form = ({ formData, onSubmit, handleChange }) => {
    return (
        <div className="form">
            <form className='form' onSubmit={onSubmit}>
                <label>enter class name:</label>
                <input
                    type='text'
                    name='className'
                    placeholder='enter class name...'
                    value={formData.className}
                    onChange={handleChange}
                />

                <label>enter topic:</label>
                <input
                    type='text'
                    name='topic'
                    placeholder='enter topic...'
                    value={formData.topic}
                    onChange={handleChange}
                />

                <label>enter hours of studied:</label>
                <input
                    type='text'
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
    )
}
