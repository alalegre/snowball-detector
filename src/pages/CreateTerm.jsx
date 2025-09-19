import React, { useState } from 'react'
import { supabase } from '../client';

export const CreateTerm = () => {
    const [term, setTerm] = useState({ term_id: '', term_name: '', term_duration: '' })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setTerm((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const createTerm = async (event) => {
        event.preventDefault();

        const processed_termID = term.term_name.toLowerCase().replaceAll(" ", "")
        console.log(processed_termID);

        await supabase
            .from('terms')
            .insert({ term_id: processed_termID, term_name: term.term_name, term_duration: term.term_duration })
            .select();
        window.location = "/";
    }

    return (
        <div className='CreateTerm'>
            <h1>Create Term</h1>
            <form onSubmit={createTerm}>

                <label>Term Name:</label> <br />
                <input type='text' id='term_name' name='term_name' onChange={handleChange} />
                <br />

                <label>Term Duration:</label> <br />
                <input type='text' id='term_duration' name='term_duration' onChange={handleChange} />
                <br />

                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}
