import React, {useState} from 'react';
import useContentful from './hooks/contentful.js';
import Person from './components/person.js'
import Bookmarks from './components/bookmark.js';
import './App.css';

const query = `
query($isPreview: Boolean=false){
  author: componentAuthor(id: "2NKz77emgdgCCePcbxHwzR") {
    ...personFields
  }
  authorPreview: componentAuthor(id: "2NKz77emgdgCCePcbxHwzR", preview: $isPreview)
    @include(if: $isPreview) {
    ...personFields
  }

  allBookmarks: bookmarkCollection {
    items {
      ...bookmarkFields
    }
  }
  favTagCollection: tagCollection(where: {title_contains: "favorite"}, limit: 1) {
    items {
      title
      linkedFrom {
        bookmarkCollection(limit: 5) {
          items {
            ...bookmarkFields
          }
        }
      }
    }
  }
  componentAuthorCollection(
    where: {OR: [{name_contains: "Brian"}, {name_contains: "Ann"}]}
  ) {
    total
    items {
      sys { id }
      name
    }
  }
}

fragment bookmarkFields on Bookmark {
  sys { id }
  title
  url
  comment
  tagsCollection {
    items { title }
  }
}
fragment personFields on ComponentAuthor {
  name
  socialLinkedIn
  socialGithub
  avatar {
    title
    url
  }
  bio { json }
}`;

function App() {
  // temp counter distraction to highlight useState, useEffect
  let [isPreview, setIsPreview] = useState(false);
  let [count, setCount] = useState(0); // [curVal, setter] = useState(initVal)

  let {data, errors} = useContentful(query, isPreview); // NOTE: error "Cannot destructure property" if 'let {data} ...'
  if (errors) {
    return <ul style={{color: "red"}}><li>ERRORS:</li><li>{errors.map(err => err.message).join('</li><li>')}</li></ul>
  }
  if (!data) return <div>Loading...</div>;

  const { allBookmarks, favTagCollection, author, authorPreview } = data;
  const favoriteTag = favTagCollection.items[0];

  return (
    <div className="App">
      <header className="App-header">
        <label>
          <input type="checkbox" checked={isPreview} onChange={() => setIsPreview(!isPreview)}></input>
          Show Preview
        </label>
        <p>counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>increment</button>

        {authorPreview ? <Person person={authorPreview} /> : ""}
        <Person person={author} />
        <Bookmarks heading="Favorite" list={favoriteTag.linkedFrom.bookmarkCollection.items} />
        <Bookmarks heading="All bookmarks" list={allBookmarks.items} />
      </header>
    </div>
  );
}

export default App;
