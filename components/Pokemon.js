import { useState, useEffect } from 'react'

export default function Pokemon() {
  const [pokémon, setPokémon] = useState('pikachu')
  const [img, setImg] = useState(null)
  const [error, setError] = useState(null)
  // effect -> whenever we're showing the screen, we also want to do other stuff
  // inside of useeffect, it takes a function and an array
  // change other things if you want
  // a better name for it would be useDomEffect
  // an example of a side effect outside of react - function add - it takes in x and y, inside of that will return x + y
  // like a side effect
  // does not run on the server
  // only works on client stuff
  // the dependency array, is state, uses state, or changes state
  // don't call useEffect unless something in the dependency array is changed

  let message = pokémon.substr(0, 4)
  //[] => effect is called on initial render only if dependency array is empty
  // otherwise if populated with [variable], effect is called on initial render + when variable changes
  // no array => effect is called on render and every state change
  // you can also put a function into the dependency array
  // computed values in react
  // a similar one is useMemo - similar to useEffect but returns something
  // usually imperative work happens in useEffect
  // can also do changes on a prop within an object, like [message.length]
  // custom hooks - no fanciness - a javascript function that wraps a react hook

  // can use this whereever i want and the effect is local to that component, can use it differently
  function useDocumentTitle(message) {
    useEffect(() => {
      1
      document.title = message
    }, [message])
  }

  function getPokemon(pokémon) {
    let isCurrent = true
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokémon}/`)
        .then((res) => res.json())
        .then((res) => {
          if (isCurrent) setImg(res.sprites.front_default)
        })
        .catch((emAll) => {
          if (isCurrent) setError(emAll)
        })
      return () => {
        isCurrent = false
      }
    }, [pokémon])
  }
  // cancel state changes on unmounted components
  getPokemon(pokémon)
  useDocumentTitle(message)
  // there isn't a way to cancel a promise
  // as a result, that can lead to memory leaks and no op errors
  // because you can't cancel that fetch, so it'll try to setstate on something that doesn't exist on the page anymore
  // use this:
  // return () => {
  //   isCurrent = false
  // }
  // will not try to set something if it no longer exists
  // cleanup function react
  return (
    <>
      <div className="pokemon">
        <div>
          <br />
          <input
            onChange={(e) => setPokémon(e.target.value)}
            defaultValue={pokémon}
            type="text"
          />
        </div>
        <span>Hello, {pokémon}!</span>
        {img !== null && <img src={img} alt={pokémon} />}
      </div>

      <style jsx>
        {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 20px;
          }

          .pokemon {
            position: relative;
            margin: 20px auto;
            width: 400px;
            height: 400px;
            border: 10px solid #282828;
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
          }

          .pokemon div {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            background: #d5615e;
            height: 50%;
          }
          .pokemon input {
            margin: auto;
            padding: 5px;
            display: block;
            border: 3px solid #282828;
            border-radius: 10px;
            font-size: 20px;
          }
          .pokemon input:focus {
            outline: 3px dashed #282828;
          }

          .pokemon span {
            text-transform: capitalize;
          }

          .pokemon img {
            margin: auto;
            display: block;
          }
        `}
      </style>
    </>
  )
}
