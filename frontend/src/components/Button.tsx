import { motion } from "framer-motion";
interface ButtonProps {
  content: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLFormElement>,
  ) => void;
}

const Button = ({ content, handleSubmit }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
   hover:bg-red-700 cursor-pointer"
      onClick={handleSubmit}
    >
      {content}
    </motion.button>
  );
};

export default Button;
