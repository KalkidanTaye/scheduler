import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() {
    console.log(history);
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    } else {
      setHistory((prev) => [...prev]);
    }
  }

  return { mode: history[history.length - 1], transition, back };
}
