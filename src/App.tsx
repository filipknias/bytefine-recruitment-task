import { useRef } from "react";
import html2canvas from "html2canvas";
import CanvasWorkspace from "./components/organisms/CanvasWorkspace";
import Canvas from "./components/organisms/Canvas";

export default function App() {
    const canvasRef = useRef<HTMLDivElement|null>(null);

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
                <div>
                    <Canvas ref={canvasRef} />
                </div>
                <div>
                    {canvasRef.current && (
                        <CanvasWorkspace 
                            canvasSizes={{ 
                                width: canvasRef.current.offsetWidth, 
                                height: canvasRef.current.offsetHeight 
                            }} 
                            exportAction={exportToPNG} 
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
