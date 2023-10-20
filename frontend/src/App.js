import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Root from "./components/Root.js";
import Search from "./pages/Search.js";
import CreateNew from "./pages/CreateNew.js";
import Impact from "./pages/Impact.js";
import Discover from "./pages/Discover.js";
import Scanner from "./pages/Scanner.js";
import Profile from "./pages/Profile.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { AuthProvider } from "./contexts/useAuth";
import Login from "./contexts/Login";
import Register from "./contexts/Register";
import RegisterSuccess from "./contexts/RegisterSuccess";
import SignInOrRegister from "./pages/SignInOrRegister";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/home" element={<Home />} />
              <Route path="/signInOrRegister" element={<SignInOrRegister />} />
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/registersuccess" element={<RegisterSuccess />} />

              <Route
                path="/impact"
                element={
                  <ProtectedRoute>
                    <Impact />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
				index
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/createnew"
                element={
                  <ProtectedRoute>
                    <CreateNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scanner"
                element={
                  <ProtectedRoute>
                    <Scanner />
                  </ProtectedRoute>
                }
              />
              <Route path="/discover" element={<Discover />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
