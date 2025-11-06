interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TitleInput({
  value,
  onChange,
  placeholder = '제목을 입력하세요',
}: TitleInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full text-3xl font-bold px-4 py-3 border-0 outline-none focus:ring-0 placeholder:text-gray-300"
    />
  );
}
