import origFetch from "node-fetch";

const fetch = (url, ...params) => {
  if (url.startsWith("/"))
    return origFetch(
      process.env.NODE_ENV === "production"
        ? "http://localhost:1337/api" + url
        : "http://localhost:1337/api" + url,
      ...params
    );
  else return origFetch(url, ...params);
};

//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default fetch;
