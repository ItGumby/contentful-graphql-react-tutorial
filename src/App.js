import React, {useState} from 'react';
import logo from './logo.svg';
import useContentful from './hooks/contentful.js';
import './App.css';

const query = `
query {
  author: componentAuthor(id: "2NKz77emgdgCCePcbxHwzR") {
    name
    internalName
    ##age
  }
}
`;

function App() {
  // temp counter distraction to highlight useState, useEffect
  let [count, setCount] = useState(0); // [curVal, setter] = useState(initVal)

  let {data, errors} = useContentful(query); // NOTE: error "Cannot destructure property" if 'let {data} ...'
  if (errors) {
    return <ul style={{color: "red"}}><li>ERRORS:</li><li>{errors.map(err => err.message).join('</li><li>')}</li></ul>
  }
  if (!data) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>increment</button>

        <h1>{data.author.name}</h1>
      </header>
    </div>
  );
}

export default App;
