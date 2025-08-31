import React from 'react'

export const TermCard = ({ term }) => {
    return (
        <div className="TermCard">
            <h1>{term.name}</h1>
            <p>{term.termDuration}</p>
        </div>
    )
}
