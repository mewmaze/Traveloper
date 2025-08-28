interface AuthButtonProps {
  text: string;
}

export default function AuthButton({ text }: AuthButtonProps) {
  return (
    <button type="submit" className="block w-full py-2 px-4 rounded-md bg-blue-600 text-white">
      {text}
    </button>
  );
}
