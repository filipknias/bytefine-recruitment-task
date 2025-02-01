import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { CanvasElement } from '@/types/store';
import { Position, Size } from '@/types/shared';
import { sizes } from '@/data/canvas';

type CanvasStore = {
    elements: CanvasElement[];
    activeElementId: string | null;
    addTextElement: (position?: Position, size?: Size) => void;
    updateElementSize: (id: string, size: Size) => void;
    updateElementPosition: (id: string, position: Position) => void;
    addImageElement: (image: File, position?: Position, size?: Size) => void;
    setActiveElement: (id: string) => void;
    clearActiveElementId: () => void;
    deleteElement: (id: string) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
    elements: [],
    activeElementId: null,

    addTextElement: (position?: Position, size?: Size) => {
        const elementId = nanoid();
        set((state) => ({
            elements: [
                ...state.elements,
                {
                    id: elementId,
                    type: "text-element",
                    position: position || { x: 0, y: 0 },
                    size: size || { width: sizes.textarea.width, height: sizes.textarea.height },
                    options: {},
                }
            ],
            activeElementId: elementId, 
        }));
    },

    updateElementSize: (id: string, size: Size) => {
        set((state) => ({
            elements: state.elements.map((element) => {
                if (element.id === id) {
                    return {
                        ...element,
                        size,
                    };
                }

                return element;
            })
        }));
    },

    updateElementPosition: (id: string, position: Position) => {
        set((state) => ({
            elements: state.elements.map((element) => {
                if (element.id === id) {
                    return {
                        ...element,
                        position,
                    };
                }

                return element;
            })
        }));
    },

    addImageElement: (image: File, position?: Position, size?: Size) => {
        const elementId = nanoid();
        set((state) => ({
            elements: [
                ...state.elements,
                {
                    id: elementId,
                    type: "image-element",
                    position: position || { x: 0, y: 0 },
                    size: size || { width: sizes.image.width, height: sizes.image.height },
                    options: { image },
                }
            ],
            activeElementId: elementId, 
        }));
    },

    deleteElement: (id: string) => {
        set((state) => ({
            elements: state.elements.filter((element) => element.id !== id),
        }));
    },

    setActiveElement: (id: string) => {
        set({ activeElementId: id });
    },
    
    clearActiveElementId: () => {
        set({ activeElementId: null });
    },
}));