import { useCanvasStore } from "@/store/useCanvasStore";
import { ComponentProps, useRef } from "react";
import { Rnd } from "react-rnd";
import MoveIcon from "@/assets/move-icon.svg";
import TrashIcon from "@/assets/trash-icon.svg";
import useClickOutiside from "@/hooks/useClickOutside";

type Props = {
    options: ComponentProps<typeof Rnd>;
    isActive: boolean;
    id: string;
    children: React.ReactNode;
}

export default function ResizableBox({ options, isActive, id, children }: Props) {
    const wrapperRef = useRef<HTMLDivElement|null>(null);
    const { 
        setActiveElement, 
        clearActiveElementId, 
        updateElementPosition, 
        updateElementSize, 
        deleteElement, 
        activeElementId,
    } = useCanvasStore();

    useClickOutiside(wrapperRef, () => {
        if (activeElementId === id) {
            clearActiveElementId();
        }
    });

    return (
        <Rnd 
            onDrag={(_e, d) => updateElementPosition(id, { x: d.x, y: d.y })}
            onResize={(_e, _d, ref) => updateElementSize(id, { width: ref.offsetWidth, height: ref.offsetHeight })}
            {...options}
        >
            <div 
                className={`border-2 py-3 px-6 relative w-full h-full ${isActive ? "border-primary" : "border-transparent"}`} 
                ref={wrapperRef} 
                onClick={() => setActiveElement(id)}
            >
                {activeElementId === id && (
                    <>
                        <div className="absolute left-0 top-0 -ml-5 -mt-5">
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer drag-trigger">
                                <img className="w-6 h-6 pointer-events-none" src={MoveIcon} alt="move-element-icon" />
                            </button>
                        </div>
                        <div className="absolute right-0 top-0 -mr-3 -mt-3">
                            <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer delete-button" onClick={() => deleteElement(id)}>
                                <img className="w-4 h-4" src={TrashIcon} alt="delete-element-icon" />
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 -mb-3 -mr-3">
                            <button className="w-6 h-6 rounded-full bg-primary border-4 border-white flex items-center justify-center cursor-se-resize"></button>
                        </div>
                    </>
                )}
                {children}
            </div>
        </Rnd>
    )
}
