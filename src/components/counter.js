import React, {useState} from "react";

function Counter() {
  let [count, setCount] = useState(0); // [curVal, setter] = useState(initVal)
  return (
    <div className="counter">
      <span>counter: {count}</span>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  );
}

export default Counter;