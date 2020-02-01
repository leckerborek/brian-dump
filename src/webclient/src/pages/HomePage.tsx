import React, { useState } from "react";
import isUrl from "is-url";

type Result = {
  uid: string;
  content: string;
  title: string;
  score: number;
  origin: string;
};

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handleUrlKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter") {
      if (!isUrl(url)) {
        alert("Not a valid URL. Sorry :(");
        return;
      }

      fetch(`/index`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url
        })
      })
        .then(() => {
          setUrl("");
        })
        .catch(err => console.error(err));
    }
  };

  const handleSearchKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter") {
      fetch(`/search`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: search
        })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          setResults(json);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <input
        className="w-full p-4 mb-4 text-2xl font-semibold text-gray-800 rounded md:w-1/2 hover:shadow-md focus:outline-none focus:shadow-outline"
        type="text"
        value={url}
        placeholder="Paste URL to index"
        onChange={ev => setUrl(ev.target.value)}
        onKeyDown={handleUrlKeyDown}
      />

      <input
        className="w-full p-4 text-2xl font-semibold text-gray-800 rounded md:w-1/2 hover:shadow-md focus:outline-none focus:shadow-outline"
        type="text"
        value={search}
        placeholder="Search for anything..."
        onChange={ev => setSearch(ev.target.value)}
        onKeyDown={handleSearchKeyDown}
      />

      <h2 className="my-4 text-2xl font-bold">Results</h2>
      <div className="flex flex-wrap justify-center">
        {results.length === 0 ? (
          <p>Search for something</p>
        ) : (
          results.map(result => (
            <a
              href={result.origin}
              target="_blank"
              rel="noopener noreferrer"
              key={result.uid}
              className="flex flex-col content-between w-64 h-48 p-8 m-4 bg-white rounded hover:shadow-md"
            >
              <p className="font-bold truncate">{result.title}</p>
              <p className="flex-1 h-12 overflow-hidden text-sm">
                {result.content}
              </p>
              <p className="self-end mt-2 text-xs text-gray-500">
                Score: {result.score}
              </p>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
