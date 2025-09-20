import React from 'react'

export const FlaggedClasses = ({ flaggedClasses, flagForSnowball }) => {

    return (
        <div className="FlaggedClasses">
            {flagForSnowball &&
                <div>
                    <p>Flagged Classes:</p>
                    <ul>
                        {
                            flaggedClasses.map((class_name, index) => (
                                <li key={index}>{class_name}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}
