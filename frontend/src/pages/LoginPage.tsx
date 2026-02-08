import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userData);
  };

  return (
    <div className="hero-bg h-screen w-full">
      <header className="flex justify-between mx-auto w-full max-w-6xl p-4">
        <img src="/netflix-logo.png" alt="logo" className="w-54" />
      </header>
      <div className="flex items-center justify-center mt-20">
        <motion.div
          className="w-full max-w-md  bg-black/60 shadow-md p-4 rounded-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.currentTarget.value })
              }
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="*******"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.currentTarget.value })
              }
            />
            <Button content="Log In" />

            <div className="text-center text-gray-400 ">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
