import React from 'react'
import { Cross as Hamburger } from 'hamburger-react'

import './Header.css'

export const Header = ({ term }) => {
    const handleHomeButton = () => {
        // Go back to home page
    }

    return (
        <div className="Header">
            <div className="term-back">
                <img className="back-btn" src="../../public/back.png" alt="back arrow" height="45" width="60" onClick={handleHomeButton} />
                <div className="term-info">
                    <h1>{term.term_name}</h1>
                    <p>{term.term_duration}</p>
                </div>
            </div>
            <Hamburger />
        </div>
    )
}
