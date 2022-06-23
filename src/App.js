import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  // converts HTML erroneously displaying to a string
  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    // prevents form from submitting without going through our React code
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        // Allows us to chose our own parameters
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)),
            answer
          ]
          return {
            // so that the index is always unique
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            // 50% of the time a positive #, 50% a negative #
            options: options.sort(() => Math.random() - .5),
          }
        }))
      })
  }

  return (
    // wrapping the form in a fragment
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          {/* populating the category drop down list */}
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input type="number" id="amount"
            // step is set to 1 to only allow whole numbers
            min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className='btn'>Generate</button>
        </div>

      </form>

      < div className="container">
        <FlashcardList flashcards={flashcards} />
      </div >
    </>
  )
}

export default App;
