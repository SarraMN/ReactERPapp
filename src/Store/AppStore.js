import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  theme: 'green',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme,
      }
    default:
      return state
  }
}

const ThemeContext = createContext()

export const ThemeConsumer = ThemeContext.Consumer
export const ThemeConsumerHook = () => useContext(ThemeContext)

export const ThemeProvider = (children) => (
  <ThemeContext.Provider value={useReducer(reducer, initialState)}>children</ThemeContext.Provider>
)
