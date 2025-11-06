const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;
