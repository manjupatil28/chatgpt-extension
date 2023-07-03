import React, { useContext } from 'react';
import { StoreContext } from '../store';

const Button = () => {
    const { state, dispatch } = useContext(StoreContext);
    const { active } = state;
  
    const handleToggle = () => {
      dispatch({ type: 'SET_ACTIVE', payload: !active });
    };
  
    return (
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          active ? 'bg-red-500' : ''
        }`}
        onClick={handleToggle}
      >
        {active ? 'Deactivate ChatGPT' : 'Activate ChatGPT'}
      </button>
    );
  };
  
  export default Button;