import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const query = `
query {
  author: componentAuthor(id: "2NKz77emgdgCCePcbxHwzR") {
    name
    internalName
  }
}
`;

const {
  REACT_APP_SPACE_ID,
  REACT_APP_ACCESS_TOKEN,
} = process.env;

function App() {
  // temp counter distraction to highlight useState, useEffect
  let [count, setCount] = useState(0); // [curVal, setter] = useState(initVal)
  let [data, setData] = useState(null);

  useEffect(() => {
    window.fetch(`https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}?access_token=${REACT_APP_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query}),
    }).then(response => response.json())
    .then(json => setData(json.data));
  }, []); // run once on DOM injection

  if (!data) return <span>Loading...</span>;

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
