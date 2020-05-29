import { useState } from 'react'

// Change this file so that:
// 1) The textarea is a controlled component
// 2) The character counter at the bottom is functional
// 3) Clicking the buttons populates the textarea

// Note: Notice the CSS classes for if the input is too long!

const CharacterLimitInput = ({ text, defaults }) => {
  const maxLength = 20
  const [length, setLength] = useState(0)
  const [message, setMessage] = useState('')

  const addDefaultText = (m) => setMood(m)

  return (
    <div //className="counterInput"
      className={`counterInput ${message.length > maxLength ? 'tooLong' : ''}`}
    >
      <div>
        {defaults.map((b) => {
          return (
            <button key={b} onClick={() => setMessage(message + b)}>
              {b}
            </button>
          )
        })}
      </div>
      <textarea
        placeholder={text}
        value={message}
        onChange={(event) => {
          if (event.target.value.length <= maxLength) {
            setMessage(event.target.value)
          }
        }}
      />
      <div>
        {message.length}/{maxLength}
      </div>
    </div>
  )
}

export default function MoodTracker() {
  let defaultMoods = ['Great', 'Okay', 'Bad']

  return (
    <section>
      <h2>Mood Tracker</h2>
      <CharacterLimitInput text={'How was your day?'} defaults={defaultMoods} />
      <style jsx global>{`
        section {
          font-family: 'Helvetica', 'Arial', sans-serif;
          line-height: 1.3;
          text-align: center;
        }

        input {
          margin: 5px 0;
          padding: 5px;
          min-width: 250px;
        }

        .counterInput button {
          margin: 5px;
          margin-left: 0;
          background: #41a5e1;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        .counterInput.tooLong {
          color: red;
        }

        .counterInput.tooLong textarea {
          background: #eebbbb;
        }
      `}</style>
    </section>
  )
}
