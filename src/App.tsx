import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./redux/hook";
import { getProfileAction } from "./redux/auth/auth.action";
import { Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";
import Authentication from "./pages/Authentication";

function App() {
  const auth = useSelector((store: RootState) => store.auth)
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (jwt) {
        try {
          await dispatch(getProfileAction(jwt));
        } catch (error) {
          console.log("error", error);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [jwt]);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "isLoggedOut") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);


  return (
    <div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Routes>
          <Route path="/*" element={loading ? <Loading /> : auth.user && jwt ?  <Layout /> : <Authentication />}></Route>
      </Routes>
    </div>
  );
}

export default App;
