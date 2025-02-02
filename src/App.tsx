import ActionButton from "@/components/molecules/ActionButton";
import { UIElements } from "@/data/UIElements";
import CanvasEditorLogo from "@/assets/canvas-editor-logo.svg";
import PrimaryButton from "./components/atoms/PrimaryButton";
import { useCanvasStore } from "./store/useCanvasStore";
import { sizes } from "./data/canvas";
import { useCallback, useRef } from "react";
import { ElementType } from "@/types/store";
import ResetModal from "./components/organisms/ResetModal";
import html2canvas from "html2canvas";
import { Size } from "./types/shared";
import Canvas from "./components/organisms/Canvas";

export default function App() {
    const { addTextElement, addImageElement, setBackground } = useCanvasStore();
    const canvasRef = useRef<HTMLDivElement|null>(null);
    const imageInputRef = useRef<HTMLInputElement|null>(null);
    const backgroundInputRef = useRef<HTMLInputElement|null>(null);
    
    const getStartingPoint = useCallback((sizes: Size) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        return {
            x: (canvasRef.current.offsetWidth / 2) - (sizes.width / 2),
            y: (canvasRef.current.offsetHeight / 2) - (sizes.height / 2),
        }
    }, [canvasRef.current, sizes]);

    const addElement = (type: ElementType) => {
        if (!canvasRef.current) return;

        switch (type) {
            case "text-element": {
                addTextElement(getStartingPoint(sizes.textarea), sizes.textarea);
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
            addImageElement(imageFile, getStartingPoint(sizes.image), sizes.image);
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

    const exportToPNG = async () => {
        if (!canvasRef.current) return;
        const canvas = await html2canvas(canvasRef.current);
        const imageUrl = canvas.toDataURL();

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'poster.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Canvas ref={canvasRef} />
                <div>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b-2 border-white-primary">
                            <div className="flex items-center">
                                <img className="h-16 mr-2" src={CanvasEditorLogo} alt="canvas-editor-logo" />
                                <h2 className="text-black-75 font-bold text-display">CanvasEditor</h2>
                            </div>
                            <ResetModal />
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
                            <PrimaryButton onClick={exportToPNG}>Export to PNG</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
