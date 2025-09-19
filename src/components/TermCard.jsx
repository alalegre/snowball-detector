import React from 'react'

export const TermCard = ({ term }) => {
    return (
        <div className="TermCard">
            <h1>{term.term_name}</h1>
            <p>{term.term_duration}</p>
        </div>
    )
}
