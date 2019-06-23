## 1. react hooks

生命时候会使用hooks
1. 函数组件转换成类组件，可以使用函数组件+hooks实现
2. useState

```js
let [state, setState] = useState(initialState)
```

```js
let memoizedState;
function useState (initialState) {
  memoizedState = memoizedState || initialState
  function setState (newState) {
    memoizedState = newState
    render()
  }
  return [memoizedState, setState]
}
function Counter() {
  // 返回数组就是为了变量名称可以自定义的
  const [number, setNumber] = useState(0)
  return (
    <>
      <p>{number}</p>
      <button
        onClick={
          () => setNumber(number + 1)
        }>
        +
      </button>
    </>
  )
}
```

# 2. useReducer
<!-- reducer跟redux的reducer一样 -->
```js
useReducer(reducer, initialArg, init)
```

```js
import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

// useState 参数是初始状态
// 第一个是当前的状态，第二个是改变状态的函数
// 给函数组件增加一个保持状态的功能


let initalArg = 0
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { number: state.number + 1 }
    case 'decrement':
      return { number: state.number - 1 }
    default:
      return state
  }
}

function init(initalArg) {
  return { number: initalArg }
}
function Counter() {
  let [state, dispatch] = useReducer(reducer, initalArg, init)
  return (
    <>
      <p>{state.number}</p>
      <button
        onClick={
          () => dispatch({ type: 'increment' })
        }>
        +
      </button>
      <button
        onClick={
          () => dispatch({ type: 'decrement' })
        }>
        -
      </button>
    </>
  )
}

ReactDOM.render(<Counter />, document.getElementById('root'));


// useReducer是useState的内部实现
// 改变逻辑状态复杂的时候

let memoizedState;
function useReducer(reducer, initalArg, init) {
  let initState = void 0;
  if (typeof init !== 'undefined') {
    initState = init(initalArg)
  } else {
    initState = initalArg
  }
  function dispatch(action) {
    memoizedState = reducer(memoizedState, action)
    render()
  }
  memoizedState = memoizedState || initState
  return [memoizedState, dispatch]
}
```

```js
let memoizedState;
function useReducer(reducer, initalArg, init) {
  let initState = void 0;
  if (typeof init !== 'undefined') {
    initState = init(initalArg)
  } else {
    initState = initalArg
  }
  function dispatch(action) {
    memoizedState = reducer(memoizedState, action)
    render()
  }
  memoizedState = memoizedState || initState
  return [memoizedState, dispatch]
}

function useState(initState) {
  return useReducer((oldState, newState) => newState, initState)
}
```

多个useState的使用
```js
function render() {
  index = 0
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
render()

let memoizedStates = []
let index = 0
function useState (initialState) {
  memoizedStates[index] = memoizedStates[index] || initialState
  let currentIndex = index
  function setState (newState) {
    memoizedStates[currentIndex] = newState
    render()
  }
  return [memoizedStates[index++], setState]
}
```
类组件性能差，高阶组件的复用差，生命周期管理麻烦

# 3.  副作用
函数主体中,不能写副作用的逻辑,订阅,定时器
useEffect 给函数组件添加了副作用的
替代组件的 ddmount didupdate willunmount

```js
let memoizedStates =[]
function useEffect (callback, dependencies) {
  if (!dependencies) {
    index++;
    return callback()
  }
  let lasDependencies = memoizedStates[index]
  // if (!dependencies) return callback()
  let changed = lasDependencies?
  !dependencies.every((item, index) => item === memoizedStates[index]):[]
  if (changed) {
    callback()
    memoizedStates[index] = dependencies
  }
  index++
}
```
