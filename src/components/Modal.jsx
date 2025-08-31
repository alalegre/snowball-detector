import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './Modal.css'

export const Modal = ({ open, onClose, children, onSubmit, handleChange, formData, classList }) => {
    if (!open) return null;


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
                        {/* <input
                            type='text'
                            name='className'
                            placeholder='enter class name...'
                            value={formData.className}
                            onChange={handleChange}
                        /> */}

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
