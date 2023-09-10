import { useState } from "react";

// As seen here, the `useVisualMode` function can take an initial 
// argument to set the mode state. We then return an object `{ mode }`, 
// which can also be written as `{ mode: mode }`.This lets our tests 
// (and components) access the current value of the mode from the hook.
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //we need history to go back to previous mode
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace === true) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return {
    mode: history[history.length -1],
    transition: transition,
    back: back
  };
}


