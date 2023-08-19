import { useState, useEffect } from "react";

const {
    REACT_APP_SPACE_ID,
    REACT_APP_ACCESS_TOKEN,
  } = process.env;

// as a Java developer, React Hooks are like services but MUST start with "use*"
function useContentful(query) {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.fetch(
        `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query}),
        })
        .then(response => { return response.json() })
        .then(json => {
            console.debug({"service": "hooks/contentful.js", "json": json});
            setData(json.data)
        })
  }, [query]); // run once on DOM injection, pass in dependencies requiring re-run
  return data;
}

export default useContentful;