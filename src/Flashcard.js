import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
    // useState initially false so the front side displays by default
    const [flip, setFlip] = useState(false)

    return (
        // toggle flip on click from flip to not flip
        <div
            // adds a class of card to each card - and -
            // ternary: if flip is true add the class of flip. otherwise add an empty className
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}>
            {/* ternary: if flip is true return answer otherwise return question */}

            <div className='front>'>
                {flashcard.question}
                <div className='flashcard-options'>
                    {flashcard.options.map(option => {
                        return <div className='flashcard-option'>{option}</div>
                    })}
                </div>
            </div>
            <div className='back'>{flashcard.answer}</div>
            {/* {flip ? flashcard.answer : flashcard.question} */}
        </div>
    )
}
