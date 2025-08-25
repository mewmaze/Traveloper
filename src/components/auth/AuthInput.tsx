'use client';

interface AuthInputProps {
  type: 'email' | 'password' | 'text';
  name: string;
  placeholder: string;
  emoji: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
}

export default function AuthInput({
  type,
  name,
  placeholder,
  emoji,
  value,
  onChange,
  error,
  errorMessage,
  required = true,
}: AuthInputProps) {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <span>{emoji}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="block w-full pl-10 border placeholder-gray-499 "
          placeholder={placeholder}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-red-600 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
