import { useState } from 'react'

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default function Counter() {
  let [count, setCount] = useState(0)
  // can add as many state variables as you want
  const [error, setError] = useState(null)
  const add = () => {
    setCount(count + 1)
    setError(false)
  }
  const subtract = () => {
    if (count > 1) {
      setCount(count - 1)
    } else {
      setError(true)
    }
  }
  return (
    <div>
      <Button onClick={subtract} aria-label="button">Subtract</Button>
      Let's count: {count} 
      <Button onClick={add} className={'fish'}>Add</Button>
      { error && (
      <div style={{color: 'red'}}>ERROR: VALUE SHOULD BE POSITIVE</div>)}
    </div>
  )
}
// doesn't matter if you use const or let here

// useState actually returns a tuple
// useState's default is 0
// count[0] = the state variable
// let variable = count[0]
// let setter = count[1]
// under the hood it only updates what it needs to render

// still performant to setError(false)
// whenever add is clicked? yes! because under the hood
// it does a diff to see whether the function should be called

// switch to a reducer if you have more than 4 state variables
// in a function

// props and state are very fundamental to react, most people only use these

// I AM REACT
// let el = Counter()
// let domTable = {}
// it does something like createDome(el, domTable) <- this is the virtualDom
// once it puts the counter on the page, let the old Element = element on the page
// let el = Counter(with new state)
// React creates a diff, diffing old and new element (diff(oldEl, el))
// figures out that diff and commits(diff) to the dom, only
// committing what has changed so it doesn't rerender the whole
// page or component
// very performant by default when it comes to state changes

// export default - the thing that's being exported when you import things
// the default component that is exported when it's imported into another file
// ...props -> spreading, if you had 3 different props, it's just for custom props
// you'll see this a lot in component libraries, such as richUI
// it allows people to add their custom component
