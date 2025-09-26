interface AuthButtonProps {
  text: string;
}

export default function AuthButton({ text }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="block w-full h-12 rounded-md bg-primary text-white font-bold hover:bg-primary-hover cursor-pointer transition"
    >
      {text}
    </button>
  );
}
