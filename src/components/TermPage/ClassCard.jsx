import { useState } from 'react'

import './ClassCard.css'
import { AddClassModal } from '../AddClassModal';

export const ClassCard = ({ classesData, termID, handleAddClass }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="ClassCard">
            <div className="edit-button">
                <img src='../public/three-dots.png' />
            </div>

            {classesData && classesData.length > 0 ? (
                <>
                    <ul className='classList'>
                        {
                            classesData.map((cls) => (
                                <li key={cls.class_id}>{cls.class_name}</li>
                            ))
                        }
                        <button className='add-class' onClick={() => setIsOpen(true)}>+</button>
                    </ul>
                </>
            ) : (
                <div className="no-classes">
                    <h3>No classes. Add some!</h3>
                    <button className='add-class' onClick={() => setIsOpen(true)}>+</button>
                </div>
            )}

            <AddClassModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                termID={termID}
                handleAddClass={handleAddClass}
            />

        </div>
    )
}
