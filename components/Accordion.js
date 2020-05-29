import { Fragment, useState, createContext, useContext } from 'react'
import Description from '@components/Description'

function Accordion({ data, position = 'top', disabled = '1' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div data-accordion>
      {data.map((tab, index) => {
        const isActive = index === activeIndex
        const isDisabled = disabled.includes(index)
        const title = (
          <div
            data-panel-title
            className={isDisabled ? 'disabled' : isActive ? 'expanded' : ''}
            onClick={() => {
              if (!isDisabled) setActiveIndex(index)
            }}
          >
            <span>{tab.label}</span>
            <span>{tab.icon}</span>
          </div>
        )
        const content = (
          <div data-panel-content className={isActive ? 'expanded' : ''}>
            {tab.content}
          </div>
        )
        return (
          <Fragment key={index}>
            {position == 'bottom' ? [content, title] : [title, content]}
          </Fragment>
        )
      })}
    </div>
  )
}

function App() {
  const data = [
    {
      label: 'Paris',
      icon: '🧀',
      content: <Description city="paris" />,
    },
    {
      label: 'Lech',
      icon: '⛷',
      content: <Description city="lech" />,
    },
    {
      label: 'Madrid',
      icon: '🍷',
      content: <Description city="madrid" />,
    },
  ]

  let AccordionContext = createContext()
  // contexts affect rerenders
  // can get very unweildy very fast
  // make sure you're not constantly updating everything at once
  // prop drilling is still a valid way to do things
  // it's about the implicit way to do things

  function AccordionCC({ children }) {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
      <div data-accordian>
        {children.map((child, index) => {
          return (
            <AccordionContext.Provider
              value={{ activeIndex, setActiveIndex, index }}
            >
              {child}
            </AccordionContext.Provider>
          )
        })}
      </div>
    )
  }

  let SectionContext = createContext()

  function Section({ children, disabled }) {
    return (
      <SectionContext.Provider value={{ disabled }}>
        <div data-section>{children}</div>
      </SectionContext.Provider>
    )
  }

  function Title({ children }) {
    let { activeIndex, setActiveIndex, index } = useContext(AccordionContext) // TODO
    let isActive = index == activeIndex
    let disabled = useContext(SectionContext)

    return (
      <div
        data-panel-title
        className={disabled ? 'disabled' : isActive ? 'expanded' : ''}
        onClick={() => {
          if (!disabled) setActiveIndex(index)
        }}
      >
        {children}
      </div>
    )
  }

  function Content({ children }) {
    let { activeIndex, index } = useContext(AccordionContext)
    let isActive = index == activeIndex
    return (
      <div data-panel-content className={isActive ? 'expanded' : ''}>
        {children}
      </div>
    )
  }

  // function Description({ children }) {
  //   return <div data-panel-title>children</div>
  // }

  // this is very jquery like because we have a single entrypoint
  // and we have to add all of our features to this entrypoint
  // if you see a function in the wild
  // if a component has a ton of props just like a function has a ton of parameters,
  // it's not good, you should break it down more
  // too many props is bad! too much responsibility

  // instead of having everything in a single entrypoint, different section, more markup but
  // create components that can be used by the users of the API
  // much cleaner + more extensible

  // don't wanna prop drill (drill props into multiple components)
  // there's a great hook/API - context api
  return (
    <div className="App">
      {/* <Accordion data={data} position="top" disabled={[1]} /> */}
      <AccordionCC>
        <Section>
          <Title>
            Paris <span>🧀</span>
          </Title>
          <Content>
            <Description city="paris" />
          </Content>
        </Section>
        <Section>
          <Title>
            Lech <span>⛷</span>
          </Title>
          <Content>
            <Description city="lech" />
          </Content>
        </Section>
        <Section disabled>
          <Title>
            Madrid <span>🍷</span>
          </Title>
          <Content>
            <Description city="madrid" />
          </Content>
        </Section>
      </AccordionCC>
      <style jsx global>{`
        .App {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #646f74;
        }

        [data-accordion] {
          margin: 0 auto;
          width: 400px;
          box-shadow: 0 10px 20px -10px #646f74;
        }

        [data-panel-title] {
          display: flex;
          justify-content: space-between;
          padding: 15px 15px 15px 25px;
          background: white;
          border-top: 1px solid #edf2f8;
          border-bottom: 1px solid white;
          cursor: pointer;
          transition: border 0.2s, font-weight 0.2s;
        }
        [data-panel-title]::before {
          display: inline;
          content: '+';
        }
        [data-panel-title]:hover {
          border-bottom: 1px solid #646f74;
          font-weight: bold;
        }
        [data-panel-title].expanded {
          border-bottom: 1px solid #646f74;
        }
        [data-panel-title].expanded::before {
          content: '-';
        }
        [data-panel-title].disabled {
          background: #f3f6fc;
          color: #99c9ff;
          border: 1px solid #cee4fd;
          cursor: not-allowed;
        }
        [data-panel-title].disabled::before {
          content: 'x';
        }
        [data-panel-title].disabled:hover {
          border-bottom: 1px solid #cee4fd;
        }

        [data-panel-content] {
          background: #edf2f8;
          visibility: hidden;
          height: 0;
          padding: 0;
          font-size: 0;
          transition: height 0.2s, visibility 0.2s, padding 0.2s;
        }
        [data-panel-content].expanded {
          visibility: visible;
          height: auto;
          padding: 15px;
          font-size: 1em;
          border-bottom: 1px solid #edf2f8;
        }
      `}</style>
    </div>
  )
}

export default App
