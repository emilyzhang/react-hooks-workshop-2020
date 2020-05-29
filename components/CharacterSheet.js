import { useState, useReducer } from 'react'
import friendlyWords from 'friendly-words'

let backgrounds = [
  'Noble',
  'Urchin',
  'Folk Hero',
  'Acolyte',
  'Criminal',
  'Hermit',
  'Guild Artisan',
  'Sage',
  'Wizard',
  'Villager',
]

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

function randomName() {
  let array = friendlyWords.predicates
  let string = array[Math.floor(Math.random() * array.length)]
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// what if you have too many states
// redux -> context and reducers
// reducers are a way to manage state in react instead of using
// useState
// useState is just a wrapper around useReducer!
// what are reducers?
// let array = [1, 2, 3, 4, 5]
// also have an add function
// let add  = (x, y) => x+y
// let sum = array.reduce(add, 0)
// console.log(sum)
// first iteration = 0+1
// then 1 + 2
// then 3+3
// 6+4
// 10+5
// and so on
// think of the initial value as the current state of the app
// then the new thing that's being added is the new state of the app
// understanding how reducers work is really what you should know
// but using useContext and useReducers is MUCH cleaner
// redux is old
// making a state machine with reducers is really cool
// try using xstate for reducers
// reducers are similar to vuex
// can move hooks outside of component

export default function App() {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'BACKGROUND_SELECTED': {
          return { ...state, background: action.value }
        }
        case 'BG_NOT_EXIST': {
          return { ...state, error: 'Background does not exist' }
        }
        case 'NO_ERRORS_EXIST': {
          return { ...state, error: null }
        }
        case 'TOGGLE_DARK_MODE': {
          return { ...state, darkMode: !state.darkMode }
        }
        case 'LONG_NAME': {
          return { ...state, error: 'Name is WAY too long, bucko.' }
        }
        case 'SET_NAME': {
          return { ...state, name: action.name }
        }
        case 'RANDOMIZE': {
          return {
            ...state,
            name: randomName(),
            background: randomBackground(),
          }
        }
      }
    },
    {
      darkMode: false,
      name: '',
      background: '',
      error: null,
    }
  )

  let { darkMode, name, background, error } = state

  // let [darkMode, setDarkMode] = useState(false)
  // let [name, setName] = useState('')
  // let [background, setBackground] = useState('')
  // let [error, setError] = useState(null)

  function handleBackgroundSelect(event) {
    dispatch({ type: 'BG_SELECT', value: event.target.value })
    // let value = event.target.value
    // setBackground(value)
    if (!backgrounds.includes(value)) {
      dispatch({ type: 'BG_NOT_EXIST' })
    } else {
      dispatch({ type: 'NO_ERRORS_EXIST' })
    }
  }

  return (
    <>
      <div className={`App ${darkMode ? 'darkmode' : ''}`}>
        <button
          onClick={() => {
            dispatch({ type: 'TOGGLE_DARK_MODE' })
          }}
        >
          Dark Mode {darkMode ? 'ON' : 'OFF'}
        </button>{' '}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(event) => {
            dispatch({ type: 'SET_NAME' })
            if (event.target.value.length > 15) {
              dispatch({ type: 'LONG_NAME' })
            }
          }}
        />
        <select value={background} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>
          })}
        </select>
        {error && (
          <div className="error">
            {error}
            <button
              onClick={() => {
                dispatch({ type: 'NO_ERRORS_EXIST' })
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h2>Name: {name}</h2>
          <h2>Background: {background}</h2>
        </div>
        <button
          onClick={() => {
            dispatch({ type: 'RANDOMIZE' })
          }}
        >
          Do it all for me instead
        </button>
      </div>
      <style jsx>{`
        .App {
          width: 100vw;
          height: 100vh;
          font-family: sans-serif;
          text-align: center;
        }

        .App.darkmode {
          background: black;
          color: white;
        }

        button,
        input,
        select {
          margin: 10px;
          padding: 5px;
          background: white;
          border: 3px solid black;
          color: black;
          font-size: 20px;
        }

        input {
          width: 250px;
        }

        .darkmode button,
        .darkmode input,
        .darkmode select {
          background: black;
          border: 3px solid white;
          color: white;
        }

        .error {
          color: red;
        }

        .sheet {
          margin: 5px auto;
          max-width: 400px;
          text-align: left;
        }

        [data-reach-combobox-popover] {
          font-family: sans-serif;
        }

        .darkmode[data-reach-combobox-popover] {
          background: black;
          color: white;
        }

        [data-reach-combobox-option]:hover {
          background: red;
        }
      `}</style>
    </>
  )
}
