type Props = {
    selected: boolean;
    color: string;
    onClick: () => void;
}

export default function TextColor({ selected, color, onClick }: Props) {
  return (
    <button 
        className={`w-6 h-6 rounded-full border-2 border-transparent flex items-center justify-center cursor-pointer ${selected ? "border-white" : ""}`}
        onClick={onClick}
    >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
    </button>
  )
}
