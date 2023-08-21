import React, {useState} from 'react';
import useContentful from './hooks/contentful.js';
import Person from './components/person.js'
import Bookmarks from './components/bookmark.js';
import './App.css';

const query = `
query {
  author: componentAuthor(id: "2NKz77emgdgCCePcbxHwzR") {
    name
    socialLinkedIn
    socialGithub
    avatar {
      title
      url
    }
    bio {
      json
    }
  }
  bookmarkCollection {
    items {
      sys { id }
      title
      url
      comment
      tagsCollection {
        items {
          title
        }
      }
    }
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
        <p>counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>increment</button>

        <Person person={data.author} />
        <Bookmarks heading="All bookmarks" list={data.bookmarkCollection.items} />
      </header>
    </div>
  );
}

export default App;
