import React from 'react'

export const FlaggedClasses = ({ flaggedClasses, flagForSnowball }) => {

    return (
        <div className="FlaggedClasses">
            {flagForSnowball &&
                <div>
                    <p>Flagged Classes:</p>
                    <ul>
                        {
                            flaggedClasses.map((className, index) => (
                                <li key={index}>{className}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}
