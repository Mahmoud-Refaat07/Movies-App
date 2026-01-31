import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="relative hero-bg ">
      {/* NavBar Section */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        <Link to={"/login"} className="text-white bg-red-700 py-1 px-2 rounded">
          Sign In
        </Link>
      </header>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <motion.h1
          initial={{ x: -800 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Unlimited movies, TV shows, and more
        </motion.h1>
        <motion.p
          initial={{ x: 800 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg mb-4 text-gray-300"
        >
          Watch anywhere. Cancel anytime.
        </motion.p>
        <motion.p
          initial={{ x: -800 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-gray-300"
        >
          Ready to watch? Enter your email to create or restart your membership.
        </motion.p>
        <form className="flex flex-col justify-center md:flex-row gap-4 w-1/2">
          <motion.input
            initial={{ x: -600 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="p-2 md:p-4 rounded flex-1 bg-black/80 border border-gray-700"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <motion.button
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="bg-red-700 text-xl lg:text-1xl px-2 lg:px-5 md:py-2 rounded flex justify-center
            items-center cursor-pointer"
          >
            Get Started
            <ChevronRight className="size-8 md:size-9" />
          </motion.button>
        </form>
      </div>
      {/* Separetor */}
      <div className="w-full h-3 bg-[#232323]" aria-hidden="true"></div>
      {/* 1st Section */}
      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center md:flex-row flex-col px-4 md:px-2">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox Chromecast, Apple Tv,
              Blu-ray players, and more.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative " />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/1.5 z-10 "
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
      {/* Separetor */}
      <div className="w-full h-3 bg-[#232323]" aria-hidden="true"></div>
      {/* 2st Section */}
      <div className="bg-black text-white py-2">
        <div className="flex justify-center items-center max-w-6xl mx-auto md:flex-row flex-col-reverse px-4 md:px-2">
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="relative">
              <img
                src="stranger-things-lg.png"
                alt="stranger things img"
                className="mt-4"
              />
              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black 
              w-3/4 lg:w-1/2 h-15 md:h-24  border border-slate-500 rounded-md px-2"
              >
                <img
                  src="/stranger-things-sm.png"
                  alt="stranger things"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favourtes easily and always have something to watch.
            </p>
          </motion.div>
        </div>
      </div>
      {/* Separetor */}
      <div className="w-full h-3 bg-[#232323]" aria-hidden="true"></div>
      {/* 3rd Section */}
      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center md:flex-row flex-col px-4 md:px-2">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and Tv.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <img
              src="/device-pile.png"
              alt="Device image"
              className="mt-4 z-20 relative "
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 
              max-w-[63%] "
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
      {/* Separetor */}
      <div className="w-full h-3 bg-[#232323]" aria-hidden="true"></div>
      {/* 4rd Section */}
      <div className="bg-black text-white py-2">
        <div className="flex justify-center items-center max-w-6xl mx-auto md:flex-row flex-col-reverse px-4 md:px-2">
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="relative">
              <img src="kids.png" alt="stranger things img" className="mt-4" />
            </div>
          </motion.div>
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profile for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with thier favourite characters in a space
              made just for them-free with your membership.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
