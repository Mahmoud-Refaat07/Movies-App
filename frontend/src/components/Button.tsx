import { motion } from "framer-motion";
interface ButtonProps {
  content: string;
}

import { Loader } from "lucide-react";

import useAuthStore from "../store/useAuthStore.js";

const Button = ({ content }: ButtonProps) => {
  const { loading } = useAuthStore();
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
   hover:bg-red-700 cursor-pointer"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        content
      )}
    </motion.button>
  );
};

export default Button;
