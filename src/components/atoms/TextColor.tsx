type Props = {
    selected: boolean;
    color: string;
}

export default function TextColor({ selected, color }: Props) {
  return (
    <div className={`w-6 h-6 rounded-full border-2 border-transparent flex items-center justify-center ${selected ? "border-white" : ""}`}>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
    </div>
  )
}
