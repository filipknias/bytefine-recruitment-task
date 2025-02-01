import ActionButton from "@/components/molecules/ActionButton";
import { UIElements } from "@/data/UIElements";
import CanvasEditorLogo from "@/assets/canvas-editor-logo.svg";
import ResetIcon from "@/assets/reset-icon.svg";
import PrimaryButton from "./components/atoms/PrimaryButton";
import TextArea from "./components/organisms/TextArea";
import { useCanvasStore } from "./store/useCanvasStore";
import { CANVAS_HEIGHT, sizes } from "./data/canvas";
import { useMemo, useRef } from "react";
import { ElementType } from "@/types/store";
import ImageElement from "./components/organisms/ImageElement";

export default function App() {
    const { addTextElement, elements, addImageElement, setBackground, background } = useCanvasStore();
    const canvasRef = useRef<HTMLDivElement|null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const backgroundInputRef = useRef<HTMLInputElement>(null);

    const textElements = useMemo(() => {
        return elements.filter((element) => element.type === "text-element")
    }, [elements]);
    const imageElements = useMemo(() => {
        return elements.filter((element) => element.type === "image-element" && element.options.image)
    }, [elements]);
    
    const startingPoint = useMemo(() => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        return {
            x: (canvasRef.current.offsetWidth / 2) - (sizes.textarea.width / 2),
            y: (canvasRef.current.offsetHeight / 2) - (sizes.textarea.height / 2),
        }
    }, [canvasRef.current]);

    const addElement = (type: ElementType) => {
        if (!canvasRef.current) return;

        switch (type) {
            case "text-element": {
                addTextElement(startingPoint, sizes.textarea);
                break;
            }
            case "image-element": {
                if (!imageInputRef.current) return;
                imageInputRef.current.click();
                break;
            }
            case "background-element": {
                if (!backgroundInputRef.current) return;
                backgroundInputRef.current.click();
                break;
            }
        }        
    };

    const uploadAndAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            addImageElement(imageFile, startingPoint, sizes.image);
            e.target.value = '';
        }
    };

    const uploadAndSetBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const backgroundFile = e.target.files[0];
            setBackground(backgroundFile);
            e.target.value = '';
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="w-full bg-black-50 flex items-center justify-center relative" style={{ height: CANVAS_HEIGHT }} ref={canvasRef}>
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
                                image={element.options.image!}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b-2 border-white-primary">
                            <div className="flex items-center">
                                <img className="h-16 mr-2" src={CanvasEditorLogo} alt="canvas-editor-logo" />
                                <h2 className="text-black-75 font-bold text-display">CanvasEditor</h2>
                            </div>
                            <button className="text-red-primary cursor-pointer inline-flex items-center pb-1 border-b border-red-primary">
                                <span className="font-medium text-body mr-1">Reset</span>
                                <img className="h-6" src={ResetIcon} alt="reset-icon" />
                            </button>
                        </div>
                        <div className="mb-8 bg-white-secondary rounded-lg px-4 py-6">
                            <h3 className="text-black-100 font-bold text-body">Add content</h3>
                        </div>
                        <div className="flex-1 pb-12 mb-8 border-b-2 border-white-primary">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {UIElements.map((element) => (
                                    <ActionButton 
                                        key={element.label}
                                        icon={element.icon} 
                                        text={element.label}
                                        onClick={() => addElement(element.type)}
                                    />
                                ))}
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={uploadAndAddImage}
                                />
                                <input
                                    ref={backgroundInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={uploadAndSetBackground}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton>Export to PNG</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
