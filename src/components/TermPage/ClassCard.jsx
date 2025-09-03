import React from 'react'
import './ClassCard.css'

export const ClassCard = ({ termClasses }) => {
    return (
        <div className="ClassCard">
            <ul className='classList'>
                {
                    termClasses.map((className, index) => (
                        <li key={index}>{className}</li>
                    ))
                }
                <button className='add-class'>+ Add Class</button>
            </ul>
        </div>
    )
}
