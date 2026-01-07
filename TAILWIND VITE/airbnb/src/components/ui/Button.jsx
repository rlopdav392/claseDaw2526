export const Button = ({
  children,
  onClick,
  variant = "default", // "default" o "outline"
  size = "md", // "sm", "md", "lg", "icon"
  className = "",
  ...props
}) => {
  let base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors";

  // Variantes
  if (variant === "default")
    base += " bg-blue-600 text-white hover:bg-blue-700";
  if (variant === "outline")
    base += " border border-gray-300 bg-transparent hover:bg-gray-100";

  // Tamaños
  if (size === "sm") base += " px-2 py-1 text-sm";
  if (size === "md") base += " px-4 py-2 text-base";
  if (size === "lg") base += " px-6 py-3 text-lg";
  if (size === "icon") base += " p-2";

  return (
    <button onClick={onClick} className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
};
