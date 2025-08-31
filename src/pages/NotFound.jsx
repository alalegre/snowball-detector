import React from 'react'
import { Link } from 'react-router'

export const NotFound = () => {
    return (
        <div className='NotFound'>
            <h1>Page Not Found</h1>
            <Link to={'/'}>
                <button>Go back home</button>
            </Link>
        </div>
    )
}
