import React, { useState } from 'react'

export default function Flashcard({ flashcard }) {
    // useState initially false so the front side displays by default
    const [flip, setFlip] = useState(false)

    return (
        // toggle flip on click from flip to not flip
        <div onClick={() => setFlip(!flip)}>
            {/* ternary: if flip is true return answer otherwise return question */}
            {flip ? flashcard.answer : flashcard.question}
        </div>
    )
}
