import { render, screen } from "@testing-library/react"
import { test, describe } from 'vitest';
import ImageElement from "@/components/organisms/ImageElement";
import TestImage from "@/assets/image-icon.svg";

describe("ImageElement", () => {
    test("renders component", () => {
        const props = { 
            id: Math.random().toString(),
            position: { x: 0, y: 0 },
            size: { width: 100, height: 100 },
            imageUrl: TestImage,
        };
        
        render(<ImageElement {...props} />);
    });

    test("image should have correct src", () => {
        const props = { 
            id: Math.random().toString(),
            position: { x: 0, y: 0 },
            size: { width: 100, height: 100 },
            imageUrl: TestImage,
        };
        
        render(<ImageElement {...props} />);

        const image = screen.getByAltText(props.imageUrl);

        expect(image).toHaveAttribute('src', props.imageUrl);
    });
})
