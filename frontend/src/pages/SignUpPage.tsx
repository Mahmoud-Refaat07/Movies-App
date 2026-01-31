import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const SignupPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { user, signup } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(userData);
  };
  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto  flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex items-center justify-center mt-20 mx-3">
        <motion.div
          className="w-full max-w-md p-8 bg-black/60 rounded-lg shadow-md"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>
          <form className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@mail.com"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.currentTarget.value })
              }
            />
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="Jhon Doe"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.currentTarget.value })
              }
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="******"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.currentTarget.value })
              }
            />
            <Button content="Sign Up" handleSubmit={handleSubmit} />
            <div className="text-center text-gray-400 ">
              Already a member?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
