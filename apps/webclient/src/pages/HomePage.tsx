import React, { useState, useEffect, useCallback } from "react";
import isUrl from "is-url";
import SortButton from "../components/SortButton";
import moment from "moment";
import { SearchRequest } from "brian-dump-shared/model/";

type Result = {
  uid: string;
  content: string;
  title: string;
  score: number;
  origin: string;
  created: string;
};

export type Toggled = {
  date: boolean;
  score: boolean;
};

const test: SearchRequest = {
  query: "this is just a test"
};

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [sortedResults, setSortedResults] = useState<Result[]>([]);
  const [toggled, setToggled] = useState<Toggled>({
    date: false,
    score: true
  });

  const sortResults = useCallback(() => {
    //if (!results) return;

    setSortedResults(
      results.sort((a, b) => {
        if (toggled.date) {
          if (new Date(a.created) < new Date(b.created)) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.score < b.score) {
            return 1;
          } else {
            return -1;
          }
        }
      })
    );
  }, [results, toggled]);

  useEffect(() => {
    sortResults();
  }, [results, sortResults]);

  const handleToggledClicked = (button: string) => {
    if (button === "date" && toggled.date) {
      return;
    }

    if (button === "score" && toggled.score) {
      return;
    }

    setToggled(current => {
      return {
        date: !current.date,
        score: !current.score
      };
    });
  };

  const handleUrlKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === "Enter") {
      if (!isUrl(url)) {
        alert("Not a valid URL. Sorry :(");
        return;
      }

      fetch(`/api/index`, {
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
      fetch(`/api/search`, {
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

      <h2 className="mt-4 text-2xl font-bold">Results</h2>
      <div className="flex mt-2 mb-2">
        <SortButton
          type="date"
          toggled={toggled}
          handleToggledClicked={handleToggledClicked}
        >
          Date
        </SortButton>
        <SortButton
          type="score"
          toggled={toggled}
          handleToggledClicked={handleToggledClicked}
        >
          Score
        </SortButton>
      </div>
      {sortedResults.length === 0 ? (
        <p>Search for something</p>
      ) : (
        sortedResults.map(result => (
          <a
            href={result.origin}
            target="_blank"
            rel="noopener noreferrer"
            key={result.uid}
            className="flex flex-col content-between w-64 h-48 p-8 m-4 bg-white rounded hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              {moment(result.created).fromNow()}
            </p>
            <p className="font-bold truncate">{result.title}</p>
            <p className="flex-1 h-12 overflow-hidden overflow-y-scroll text-sm">
              {result.content}
            </p>
            <p className="mt-2 text-xs text-gray-500">Score: {result.score}</p>
          </a>
        ))
      )}
    </div>
  );
};

export default HomePage;
