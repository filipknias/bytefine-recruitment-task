import MoveIcon from "@/assets/move-icon.svg";
import TrashIcon from "@/assets/trash-icon.svg";
import TextColor from "../atoms/TextColor";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { canvasTextColors } from "@/data/CanvasTextColors";

export default function TextArea() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 384, height: 96 });
    const [textColor, setTextColor] = useState(canvasTextColors[0]);

    return (
        <Rnd
            position={{ x: position.x, y: position.y }}
            size={{ width: size.width, height: size.height }}
            bounds="parent"
            enableResizing={{ bottomRight: true }}
            dragHandleClassName="drag-handle"
            onDrag={(_e, d) => setPosition({ x: d.x, y: d.y })}
            onResize={(_e, _d, ref) => setSize({ width: ref.offsetWidth, height: ref.offsetHeight })}
        >
            <div className="border-2 border-primary py-3 px-6 relative w-full h-full">
                <div className="absolute left-0 top-0 -ml-5 -mt-5">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer drag-handle">
                        <img className="w-6 h-6 pointer-events-none" src={MoveIcon} alt="move-element-icon" />
                    </button>
                </div>
                <div className="absolute right-0 top-0 -mr-3 -mt-3">
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer">
                        <img className="w-4 h-4" src={TrashIcon} alt="delete-element-icon" />
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 -mb-3 -mr-3">
                    <button className="w-6 h-6 rounded-full bg-primary border-4 border-white flex items-center justify-center cursor-se-resize"></button>
                </div>
                <div className="absolute left-0 -bottom-8 flex gap-1">
                    {canvasTextColors.map((color) => (
                        <TextColor
                            key={color}
                            color={color} 
                            selected={color === textColor} 
                            onClick={() => setTextColor(color)} 
                        />
                    ))}
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full flex items-center justify-center">
                    <textarea 
                        className="font-bold text-display text-black-100 placeholder:text-black-100/25 text-center outline-none max-w-xs mx-auto resize-none"
                        style={{ color: textColor }}
                        placeholder="Type your text here"
                    ></textarea>
                </div>
            </div>
        </Rnd>
    )
}
