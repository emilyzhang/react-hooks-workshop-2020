// import Counter from '@components/Counter'
// next abstracts away a lot of stuff

// normally
import React from 'react'
import Counter from '@components/Counter' // adding a custom rule @components, it's in jsconfig.json to set, it's a nice alias for formatting

// import ReactDom from 'react-dom'
// ReactDOM.render(reactEl, domEl)
// it's a little more accepted now to add html in javascript
// it's doing react.createElement under the hood, it's not jsx (?), it's just javascript under the hood

let text = 'helloooo'
const reactElement = <button>{text}</button>
// const reactEl = React.createElement(
//   'div',
//   null,
//   'Hellooo',
//   <h2>text</h2>,
//   <h1>what</h1>
// ) // what's happening under the hood?

// components are reusable, elements are not
// turn it into a function that returns jsx, now it can be reused
// const reactElement = <button>{text}</button> vs
// const reactElement = () => <button>{text}</button>
const Button = () => <button>{text}</button> // this is a component
// <> is a fragment, allows you to prevent adding div everywhere

// add in parameters, called props, to edit a component
const ButtonWithText = (props) => {
  let { text } = props
  return <button>{text}</button>
}

// add in parameters, called props, to edit a component
const ButtonWithTextOut = ({ text, children, icon, onFish }) => {
  return (
    <button onClick={onFish}>
      {icon}
      {text}
      {children}
    </button>
  )
}

export default function PropsState() {
  return (
    <>
      <ButtonWithText text={'subtract'} />
      <ButtonWithTextOut
        text={'test'}
        onFish={() => {
          console.log('we clicked!')
        }}
      />
      <ButtonWithText children={'test'} />
      <ButtonWithText />
      <h1>{Counter()}</h1>
    </>
  )
}
// <Button>{element} {element2}</Button>
// is the same as React.createElement(Button, null, element, element2)
// which compiles down to React.createElement(Button, {children: [element1, element2]})
// you can just add different arrays to your componenet,
// it's just children that just compile down to an array and it's allowed

// more about the child prop
// to add certain styles or want to add an icon to Button?
// you can use children to solve this problem
// instead of putting the text in the prop, you could wrap something with button
// and that's considered a child
// like <Button>Substract</Button>
// don't put children as a prop
// like <Button children={"subtract"}></Button>
// rendering children by position vs rendering it by props, children will always default to rendering by position
// there's nothing like scoped slots in React out of the box
// you can pass in functions as a prop

// now about state
// use a state variable in react (used to have to use jquery - imperative)
// now using react state is declarative programming
// tell it what you want and they do it
// imperative programming - finding the thing and changing it
// declarative programming - i don't care how you do it, this is how it should be
