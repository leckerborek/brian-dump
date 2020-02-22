import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <nav className="flex flex-row items-center justify-between p-4 my-4 font-bold bg-white rounded">
          <Link to={"/"} className="text-2xl font-black">
            Brian Dump
          </Link>
          <div className="flex items-center text-gray-500 bg-gray-200 rounded">
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              className="w-64 p-2 font-medium text-gray-800 bg-transparent"
              type="text"
              placeholder="Search for anything..."
            />
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
          <Route path="*">
            <Redirect to={"/"} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
