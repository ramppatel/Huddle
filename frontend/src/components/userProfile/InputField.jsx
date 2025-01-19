const InputField = ({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  name,
  ...props
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-400 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={type === "date" && value ? value.slice(0, 10) : value} // Ensure valid date format
      onChange={onChange}
      className="w-full bg-gray-800/50 text-white p-4 rounded-lg border border-gray-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none backdrop-blur-sm transition-all"
      {...props}
    />
  </div>
);

export default InputField;
