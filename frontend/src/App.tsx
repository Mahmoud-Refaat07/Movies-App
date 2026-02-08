import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import useAuthStore from "./store/useAuthStore";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const WatchPage = lazy(() => import("./pages/WatchPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchHistoryPage = lazy(() => import("./pages/SearchHistoryPage"));
const Error404Page = lazy(() => import("./pages/Error404Page"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
          />{" "}
          <Route
            path="/history"
            element={user ? <SearchHistoryPage /> : <LoginPage />}
          />
          <Route
            path="/search"
            element={user ? <SearchPage /> : <LoginPage />}
          />
          <Route path="/*" element={<Error404Page />} />
        </Routes>
        <Footer />
        <div>
          <Toaster />
        </div>
      </Suspense>
    </>
  );
};

export default App;
