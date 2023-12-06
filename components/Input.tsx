interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 text-lg rounded-lg bg-[#222] border-2 border-neutral-700 outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900/70 disabled:cursor-not-allowed"
    />
  );
};

export default Input;
