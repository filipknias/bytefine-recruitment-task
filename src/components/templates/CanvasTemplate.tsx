import { useEffect, useRef, useState } from "react";
import Canvas from "../organisms/Canvas";
import CanvasWorkspace from "../organisms/CanvasWorkspace";
import { Size } from "@/types/shared";
import html2canvas from "html2canvas";

export default function CanvasTemplate() {
    const canvasRef = useRef<HTMLDivElement|null>(null);
    const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        if (canvasRef.current) {
            setCanvasSize({
                width: canvasRef.current.offsetWidth,
                height: canvasRef.current.offsetHeight
            });
        }
    }, [canvasRef.current]);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <Canvas ref={canvasRef} />
            </div>
            <div>
                <CanvasWorkspace 
                    canvasSizes={canvasSize} 
                    exportAction={exportToPNG} 
                />
            </div>
        </div>
    )
}
