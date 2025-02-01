import { Position, Size } from "./shared";

export type ElementType = "text-element" | "image-element" | "background-element";

export type CanvasElement = {
    id: string;
    type: ElementType;
    position: Position;
    size: Size;
    options: {
        image?: File;
    };
}