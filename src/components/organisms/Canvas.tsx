import { useCanvasStore } from "@/store/useCanvasStore";
import { forwardRef, useMemo } from "react";
import TextArea from "./TextArea";
import ImageElement from "./ImageElement";
import { CANVAS_HEIGHT } from "@/data/canvas";
import EmptyCanvasImage from "@/assets/empty-canvas.png";

const Canvas = forwardRef<HTMLDivElement>((_props, ref) => {
    const { background, elements } = useCanvasStore();

    const textElements = useMemo(() => {
        return elements.filter((element) => element.type === "text-element")
    }, [elements]);

    const imageElements = useMemo(() => {
        return elements.filter((element) => element.type === "image-element" && element.options.image)
    }, [elements]);

    return (
        <div className="w-full bg-black-50 flex items-center justify-center relative" style={{ height: CANVAS_HEIGHT }} ref={ref}>
            {elements.length === 0 && !background && <img className="w-full h-full object-cover" src={EmptyCanvasImage} alt="empty-canvas" />}
            {background && <img className="absolute inset-0 w-full h-full object-cover" src={URL.createObjectURL(background)} alt="background-image" />}
            {textElements.map((element) => (
                <TextArea 
                    key={element.id} 
                    id={element.id}
                    position={element.position}
                    size={element.size}
                />
            ))}
            {imageElements.map((element) => (
                <ImageElement 
                    key={element.id} 
                    id={element.id}
                    position={element.position}
                    size={element.size}
                    imageUrl={URL.createObjectURL(element.options.image!)}
                />
            ))}
        </div>
    )
});


export default Canvas;