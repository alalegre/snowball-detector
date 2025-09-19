import React, { useEffect } from 'react'
import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router"
import { TermCard } from '../components/TermCard';
import { CreateTerm } from './CreateTerm';

import './Home.css'
import { supabase } from '../client';

export const Home = () => {
    // // Used to store terms (e.g. Fall 25)
    const [terms, setTerms] = useState([]);

    useEffect(() => {
        const fetchTerms = async () => {
            const { data } = await supabase
                .from('terms')
                .select()
            setTerms(data)
        }
        fetchTerms().catch(console.error);
    }, [])

    return (
        <div className="Home">
            <h1 className='header'>Welcome, user</h1>
            <hr></hr>
            <h2 className='subheader'>Choose a term:</h2>

            <div className="container">
                <ul className='termList'>
                    {terms &&
                        terms.map(term => (
                            <Link
                                key={term.term_id}
                                to={`/${term.term_id}`}
                                state={{ term }}  // Pass on the term array into TermPage.jsx
                            >
                                <li>
                                    <TermCard term={term} />
                                </li>
                            </Link>
                        ))
                    }
                    <Link to='/createterm'>
                        <button className='create'>+ Add Term</button>
                    </Link>
                </ul>
            </div>
        </div>
    )
}
