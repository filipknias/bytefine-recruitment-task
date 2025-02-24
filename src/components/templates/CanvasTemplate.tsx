import { useEffect, useRef, useState } from "react";
import Canvas from "../organisms/Canvas";
import CanvasWorkspace from "../organisms/CanvasWorkspace";
import { Size } from "@/types/shared";
import { toPng } from 'html-to-image';
import { EXPORT_IMAGE_HEIGHT, EXPORT_IMAGE_WIDTH } from "@/data/canvas";

export default function CanvasTemplate() {
    const canvasRef = useRef<HTMLDivElement|null>(null);
    const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;
        setCanvasSize({
            width: canvasRef.current.offsetWidth,
            height: canvasRef.current.offsetHeight
        });
    }, [canvasRef.current]);

    const exportToPNG = async () => {
        if (!canvasRef.current) return;
        const imageUrl = await toPng(canvasRef.current, { 
            canvasWidth: EXPORT_IMAGE_WIDTH, 
            canvasHeight: EXPORT_IMAGE_HEIGHT 
        });

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
