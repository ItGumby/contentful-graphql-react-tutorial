import React, {useState} from 'react';
import useContentful from './hooks/contentful.js';
import Person from './components/person.js'
import Bookmarks from './components/bookmark.js';
import Counter from './components/counter.js';
import Page from './components/page.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page heading="MySite" color="gold" />} />
            <Route path="/about" element={<Page heading="About Us" color="green" />} />
            <Route path="/contact" element={<Page heading="Contact Us" color="red" />} >
              <Route path="privacy" element={<Page heading="Privacy Policy" color="pink" />} />
            </Route>
            <Route path="privacy" element={<Page heading="Privacy Policy" color="pink" />} />

            <Route path="/blog" element={<Page heading="Our Articles" color="rebeccapurple" />} />
            <Route path="/graphql" element={
              <>
                <Page heading="GraphQL" color="rebeccapurple" />
                <label>
                  <input type="checkbox" checked={isPreview} onChange={() => setIsPreview(!isPreview)}></input>
                    Show Preview
                </label>
                {authorPreview ? <Person person={authorPreview} /> : ""}
                <Person person={author} />
                <Bookmarks heading="Favorite" list={favoriteTag.linkedFrom.bookmarkCollection.items} />
                <Bookmarks heading="All bookmarks" list={allBookmarks.items} />
              </>
            } />
          </Routes>
        </BrowserRouter>
        <Counter />
      </header>
    </div>
  );
}

export default App;
