import React, {useState} from 'react';
import ReactDOM from 'react-dom';


// let memoizedState;
// function useState(initialState) {
//   memoizedState = memoizedState || initialState
//   function setState(newState) {
//     memoizedState = newState
//     render()
//   }
//   return [memoizedState, setState]
// }

function Counter() {
  const [
    number,
    setNumber
  ] = useState(0)
  return (
    <>
      <p>{number}</p>
      <button
        onClick={
          () => setNumber(number + 1)
        }
      >
        +
      </button>
    </>
  )
}


function render() {
  // index = 0
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
render()

// let firstWorkInProgressHook = {
//   memoizedStates: null,
//   next: null
// }
// let worInProgressHook = firstWorkInProgressHook

// function useState (initialState) {
//   // let currentHook = worInProgressHook.next?worInProgressHook.
// }

// let memoizedStates =[]
// function useEffect (callback, dependencies) {
//   if (!dependencies) {
//     index++;
//     return callback()
//   }
//   let lasDependencies = memoizedStates[index]
//   // if (!dependencies) return callback()
//   let changed = lasDependencies?
//   !dependencies.every((item, index) => item === memoizedStates[index]):[]
//   if (changed) {
//     callback()
//     memoizedStates[index] = dependencies
//   }
//   index++
// }
