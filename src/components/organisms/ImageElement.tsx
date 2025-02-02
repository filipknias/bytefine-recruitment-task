import { sizes } from "@/data/canvas";
import ResizableBox from "../molecules/ResizableBox";
import { Position, Size } from "@/types/shared";
import { useCanvasStore } from "@/store/useCanvasStore";

type Props = {
    id: string;
    position: Position;
    size: Size;
    imageUrl: string;
}

export default function ImageElement({ id, position, size, imageUrl }: Props) {
    const { activeElementId } = useCanvasStore();

    return (
        <ResizableBox
            options={{
                minWidth: sizes.image.width,
                minHeight: sizes.image.height,
                position: { x: position.x, y: position.y },
                size: { width: size.width, height: size.height },
                bounds: "parent",
                enableResizing: { bottomRight: activeElementId === id },
                dragHandleClassName: "drag-trigger"
            }}
            id={id}
            isActive={activeElementId === id}
        >
            <img 
                className="w-full h-full object-cover"
                src={imageUrl}
                alt={imageUrl}
            />
        </ResizableBox>
    )
}
