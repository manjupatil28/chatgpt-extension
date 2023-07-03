import React, { createContext, useReducer, useEffect } from 'react';

// Create the initial state
const initialState = {
  active: false,
  conversationHistory: [],
  error: null,
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, active: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversationHistory: [...state.conversationHistory, action.payload],
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create the context
export const StoreContext = createContext();

// Create the provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state after page refresh
  useEffect(() => {
    const storedState = localStorage.getItem('chatGptState');
    if (storedState) {
      dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatGptState', JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
