import React from "react";

function Bookmark({bookmark}) {
    //console.dir(bookmark);
    return (
        <div className="bookmark">
            <h4>{bookmark.title}</h4>
            <p>{bookmark.comment}</p>
            {/* his example uses documentToReactComponents for possible rich-text comment */}
            <a href={bookmark.url}>Visit</a>
            <div>
            {bookmark.tagsCollection.items.map(tag =>
                <Tag tag={tag} key={tag.title} />
                // react collections need a distinct key per item; can fake it or use a real ID
            )}
            </div>
        </div>
    );
}

function Tag({tag}) {
    return (
        <span className="tag">{tag.title}</span>
    );
}

function Bookmarks({heading, list}) {
  // console.dir(list);
  return (
    <section className="bookmarks">
      <h3>{heading}</h3>
      <div className="grid">
        {list.map(bookmark =>
            <Bookmark bookmark={bookmark} key={bookmark.sys.id} />
        )}
      </div>
    </section>
  );
};

export default Bookmarks;