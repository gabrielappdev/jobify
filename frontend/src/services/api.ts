import origFetch from "node-fetch";

const fetch = (url, ...params) => {
  if (url.startsWith("/"))
    return origFetch(
      process.env.NODE_ENV === "production"
        ? ""
        : "http://localhost:1337/api" + url,
      ...params
    );
  else return origFetch(url, ...params);
};

export default fetch;
