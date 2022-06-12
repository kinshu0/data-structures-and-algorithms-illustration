import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';



/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */

function App() {
  return (
    <div className="App">
      <BarIllustration />
    </div>
  );
}

function Bar(props) {
  return (
    <div className='bar' style={{ backgroundColor: props.color, height: props.height, flexGrow: 1 }}>
      &nbsp;
    </div>
  )
}

function generateRandomBars() {
  return [...Array(12).keys()].map(i => {
    return {
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      value: 5 + 5 * Math.ceil(Math.random() * 19),
    }
  })

}


function BarIllustration(props) {
  const [bars, setBars] = useState([])

    const selectionSort = () => {
      let min = 0
      let barsCopy = [...bars]
      for (let i = 1; i < barsCopy.length; i++) {
        if(barsCopy[i].value > barsCopy[min].value) {
          min = i
          // console.log(barsCopy[i].value)
        }
        if(min !== i) {
          let tmp = barsCopy[min]
          barsCopy[min] = barsCopy[i]
          barsCopy[i] = tmp
        }
      }
      setBars(barsCopy)
    }

    const selectionSortComplete = (direction = 1) => {
      let barsCopy = [...bars]
      for (let i = 0; i < barsCopy.length - 1; i++) {
        let min = i
        for (let j = i+1; j < barsCopy.length; j++) {
          if(direction * (barsCopy[j].value - barsCopy[min].value) < 0) {
            min = j
          }
        }

        if(min !== i) {
          let tmp = barsCopy[min]
          barsCopy[min] = barsCopy[i]
          barsCopy[i] = tmp
        }
      }
      setBars(barsCopy)
    }

  // const selectionSort = () => {
  //   const sortState = {
  //     i: 0,
  //     done: false,
  //     min: 0
  //   }

  //   const iterate = ({i, done, min}) => {
  //     if (i == bars.length) {
  //       done = true;
  //       return
  //     }
  //     for (let j = i + 1; j < bars.length; j++) {
  //       if (bars[j].value < bars[min].value) {
  //         min = j;
  //       }
  //       if (min !== i) {
  //         setBars(prev => {
  //           // let prevClone = prev.clone()
  //           let temp = prev[i];
  //           prev[i] = prev[min];
  //           prev[min] = temp;
  //           return prev
  //         })


  //       }
  //     }
  //     i++;
  //   }

  //   const intId = setInterval(() => {
  //     if (sortState.done) {
  //       clearInterval(intId)
  //     } else {
  //       iterate(sortState)
  //     }
  //   }, 1000)

  // }


  const cycle = () => {
    setBars(prev => {
      return [prev.at(-1), ...prev.slice(0,-1)]
    })
  }

  useEffect(() => {
    setBars(generateRandomBars())
    // selectionSort(bars, setBars, 1000)
  }, [])

  // useEffect(() => {
  //   console.log(bars)
  // })

  return (
    <div className='bar-main'>
      <div className='controls'>
        <button onClick={() => setBars(generateRandomBars())}>Random</button>
        <button onClick={() => cycle()}>Cycle</button>
        <button onClick={() => selectionSortComplete(1)}>Sort Ascending</button>
        <button onClick={() => selectionSortComplete(-1)}>Sort Descending</button>
      </div>
      <div className='bar-space'>
        {/* <Bar color="light-green" height="80px"/>
      <Bar color="yellow" height="80px"/>
      <Bar color="sky-blue" height="80px"/> */}
        {bars.map(({ color, value }, i) => <Bar key={i} height={`${value}%`} color={color} />)}
      </div>
    </div>
  )
}

export default App;
