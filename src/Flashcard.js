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
            {flip ? flashcard.answer : flashcard.question}
        </div>
    )
}
