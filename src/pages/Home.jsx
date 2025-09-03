import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router"
import { TermCard } from '../components/TermCard';

import './Home.css'

export const Home = () => {
    // Used to store terms (e.g. Fall 25)
    const [terms, setTerms] = useState([
        {
            id: 'fall25',
            name: 'Fall 25',
            termDuration: 'Sep 20 - Dec 12',
            classes: ['CSE 101', 'CSE 102', 'LIT 81'],
        },
        {
            id: 'winter26',
            termDuration: 'Sep 20 - Dec 12',
            name: 'Winter 26',
            classes: [],
        },
        {
            id: 'spring26',
            termDuration: 'Sep 20 - Dec 12',
            name: 'Spring 26',
            classes: [],
        }
    ]);

    return (
        <div className="Home">
            <h1>Welcome, user</h1>
            <hr></hr>
            <h2>Choose a term:</h2>

            <div className="container">
                <ul className='termList'>
                    {
                        terms.map(term => (
                            <Link
                                key={term.id}
                                to={`/${term.id}`}
                                state={{ term }}  // Pass on the term array into TermPage.jsx
                            >
                                <li>
                                    <TermCard term={term} />
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                <button className='create'>+ Add Term</button>
            </div>
        </div>
    )
}
