import { useState, useEffect } from "react";

const {
    REACT_APP_SPACE_ID,
    REACT_APP_ACCESS_TOKEN,
    REACT_APP_PREVIEW_TOKEN,
  } = process.env;

// as a Java developer, React Hooks are like services but MUST start with "use*"
function useContentful(query, isPreview) {
  let [data, setData] = useState(null);
  let [errors, setErrors] = useState(null);

  useEffect(() => {
    window.fetch(
        `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${isPreview ? REACT_APP_PREVIEW_TOKEN : REACT_APP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query, variables: {isPreview}}),
        })
        .then(response => { return response.json() })
        .then(({data, errors}) => {
            console.debug({"service": "hooks/contentful.js", "data": data, "errors": errors});
            if (errors) setErrors(errors);
            if (data) setData(data);
            // throw new Error('oopsie');
        })
        .catch(error => setErrors([error]));
  }, [query,isPreview]); // run once on DOM injection, pass in dependencies requiring re-run
  return {data, errors};
}

export default useContentful;