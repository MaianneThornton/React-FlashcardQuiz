import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
    // flip useState initially false so the front side displays by default
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('initial')
    // allows us to reference the dimensions of the cards that will automatically adjust through all re-renders of the app
    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        // 100px minimum
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight,
        // recalculating height by determining the height of the questions, answer and options
        [flashcard.question, flashcard.answer, flashcard.options])
    // recalculate the height every time the page size changes
    useEffect(() => {
        window.addEventListener("resize", setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])


    return (
        // toggle flip on click from flip to not flip
        <div
            // adds a class of card to each card - and -
            // ternary: if flip is true add the class of flip. otherwise add an empty className
            className={`card ${flip ? 'flip' : ''}`}
            // setting the height css property to the height variable
            style={{ height: height }}
            onClick={() => setFlip(!flip)}>
            {/* ternary: if flip is true return answer otherwise return question */}

            <div className='front' ref={frontEl}>
                {flashcard.question}
                <div className='flashcard-options'>
                    {flashcard.options.map(option => {
                        return <div className='flashcard-option'>{option}</div>
                    })}
                </div>
            </div>
            <div className='back' ref={backEl}>{flashcard.answer}</div>
            {/* {flip ? flashcard.answer : flashcard.question} */}
        </div>
    )
}
