import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error404Page = () => {
  return (
    <div className=" error404-bg w-full min-h-screen flex flex-col justify-center items-center text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.200),rgba(0,0,0,0.9),rgba(0,0,0,1))]" />
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="h-8" />
        </Link>
      </header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center error-page--content z-10"
      >
        <h1 className="text-7xl font-extrabold mb-4">Lost your way?</h1>
        <p className="mb-6 text-xl">
          Sorry, we can't find that page. You'll find lost to exploer on the
          home page.
        </p>
        <Link
          to={"/"}
          className="bg-white text-black py-2 px-4 rounded hover:border hover:bg-red-600 hover:text-white hover:font-semibold hover:border-white"
        >
          Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error404Page;
