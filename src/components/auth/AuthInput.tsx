import type { AuthInputProps } from '../../type/auth';

export default function AuthInput({
  type,
  placeholder,
  error,
  errorMessage,
  ...rest
}: AuthInputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full pl-10 border placeholder-gray-499 h-12 rounded-md"
        {...rest}
      />
      <div className="h-4">
        {error && <p className="mt-1 text-red-600 dark:text-red-400">{errorMessage}</p>}
      </div>
    </div>
  );
}
