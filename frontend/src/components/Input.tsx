interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-300 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white 
        focus:outline-none focus:ring"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
