import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";

import { useEffect } from "react";
import WatchPage from "./pages/WatchPage";
import useAuthStore from "./store/useAuthStore";

const App = () => {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to={"/"} /> : <SignUpPage />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <LoginPage />}
        />
      </Routes>
      <Footer />
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default App;
