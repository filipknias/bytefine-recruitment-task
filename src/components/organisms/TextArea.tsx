import { canvasTextColors, sizes } from "@/data/canvas";
import { useCanvasStore } from "@/store/useCanvasStore";
import { Position, Size } from "@/types/shared";
import ResizableBox from "../molecules/ResizableBox";
import TextColor from "../atoms/TextColor";
import { useState } from "react";

type Props = {
    id: string;
    position: Position;
    size: Size;
}

export default function TextArea({ id, position, size }: Props) {
    const { activeElementId } = useCanvasStore();
    const [textColor, setTextColor] = useState(canvasTextColors[0]);

    return (
        <ResizableBox
            options={{
                minWidth: sizes.textarea.width,
                minHeight: sizes.textarea.height,
                position: { x: position.x, y: position.y },
                size: { width: size.width, height: size.height },
                bounds: "parent",
                enableResizing: { bottomRight: activeElementId === id },
                dragHandleClassName: "drag-trigger"
            }}
            id={id}
            isActive={activeElementId === id}
        >
            {activeElementId === id && (
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
            )}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full flex items-center justify-center py-4">
                <textarea 
                    className="font-bold text-display text-black-100 placeholder:text-black-100/25 text-center outline-none max-w-xs mx-auto resize-none break-words h-full overflow-y-hidden"
                    style={{ color: textColor, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                    placeholder="Type your text here"
                ></textarea>
            </div>
        </ResizableBox>
    )
}