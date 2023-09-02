import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutePages from "./config/RoutePages";
import HeaderPage from "./layouts/HeaderPage";

export const DataContext = React.createContext();

export default function App() {
  const [filter, setFilters] = useState("");
  const [pathname, setPathname] = useState("");
  const [addPost, setAddPost] = useState(false);
  const [globalUser, setGlobalUser] = useState();

  function handleUser(val) {
    setGlobalUser(val);
  }

  function handleFilter(val) {
    setFilters(val);
  }

  function handlePathname() {
    setPathname(window.location.pathname);
  }

  function handleAddPost() {
    setAddPost(!addPost);
  }

  useEffect(() => {
    handlePathname();
  }, [window.location.pathname]);

  return (
    <BrowserRouter className="App">
      <DataContext.Provider value={{ handleFilter, filter, handlePathname, pathname, handleAddPost, addPost, handleUser, globalUser }}>
        <HeaderPage className="site-layout-sub-header-background" style={{ padding: 0, backgroundColor: "white" }} />
        <RoutePages />
      </DataContext.Provider>
    </BrowserRouter>
  );
}
