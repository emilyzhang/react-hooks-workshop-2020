import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(1)

  const handleAdd = () => setCount(count + 1)
  const handleSubtract = () => setCount(count - 1)

  return (
    <div className="counter">
      <button onClick={handleSubtract}>-</button>
      <input
        type="number"
        aria-label="count"
        value={count}
        onChange={(event) => {
          setCount(parseInt(event.target.value))
        }}
      />
      <button onClick={handleAdd}>+</button>
    </div>
  )
}

// Event => update Dom // old way of doing things
// Event + Event + Event => state => update DOM // now events trigger state, which updates the DOM

// how the dom works in jquery vs react
// jquery can't manipulate the same dom that react
// works with
// createDom creates a virtualDom, jquery works
// with the dom that's just there in the browser
// a component returns an instruction manual for the dom
// inputs are weird in the world an in react in general
// since the dawn of the web, there's only one thing
// that users can manipulate in the dom without js
// and that is inputs
// if users can update a dom element without js,
// there's a diff issue because react doesn't know
// what to do when the user is in control
// react likes to control the dom
// component - uncontrolled component is not controlled
// by react
// change value to defaultvalue to change it to a controlled component
// but how to have buttons and input work at the same time?
// add an onChange handler
// you should control it if you need to make changes
// uncontrolled input in a form is one usage for uncontrolled components, and then just catch the submit of the form
// some people just like to leave everything uncontrolled
// for as long as possible
