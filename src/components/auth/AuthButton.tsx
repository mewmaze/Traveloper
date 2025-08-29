interface AuthButtonProps {
  text: string;
}

export default function AuthButton({ text }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="block w-full h-12 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 cursor-pointer transition"
    >
      {text}
    </button>
  );
}
