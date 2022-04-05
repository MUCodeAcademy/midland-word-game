import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AboutPage from "./components/AboutPage";
import ClassicPage from "./components/ClassicPage";
import LoginPage from "./components/LoginPage";
import PlayPage from "./components/PlayPage";
import RegisterPage from "./components/RegisterPage";
import Menu from "./shared/components/Menu";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GamePage from "./components/game-room/GamePage";
import { connect } from "react-redux";
import { setUser } from "./redux/actions/user.actions";
import { verify } from "./shared/hooks/useAPI";
import useAPI from "./shared/hooks/useAPI";

import { useEffect, useState } from "react";

function App({ user, setUser }) {
  const { verify } = useAPI();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const res = await verify();

      setLoading(false);
      if (res.success) {
        setUser(res.data.username);
      }
    };
    verifyUser();
  }, []);

  return (

    <>
      {!loading && (
        <Router>
          <Menu />
          <Routes>
            <Route
              path="/play"
              element={
                <ProtectedRoute isPrivate={true}>
                  <PlayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute isPrivate={false}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute isPrivate={false}>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classic"
              element={
                <ProtectedRoute isPrivate={true}>
                  <ClassicPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute isPrivate={false}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
        <Route
          path="/room/:roomId"
          element={
            
              <GamePage />
          }
        />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </Router>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
