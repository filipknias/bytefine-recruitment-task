import TextIcon from "@/assets/text-icon.svg";
import ImageIcon from "@/assets/image-icon.svg";
import BackgroundIcon from "@/assets/background-icon.svg";
import { ElementType } from "@/types/store";

type UIElement = {
    icon: string;
    label: string;
    type: ElementType;
};

export const UIElements: UIElement[] = [
    { icon: TextIcon, label: "Text", type: "text-element" },
    { icon: ImageIcon, label: "Image", type: "image-element" },
    { icon: BackgroundIcon, label: "Background", type: "background-element" },
];