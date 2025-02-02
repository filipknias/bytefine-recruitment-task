import { render, screen } from "@testing-library/react"
import { test, describe } from 'vitest';
import ActionButton from "@/components/molecules/ActionButton";
import TestImage from "@/assets/image-icon.svg"


describe("ActionButton", () => {
    test("renders component", () => {
        const props = { 
            icon: TestImage,
            text: "Test Action Button", 
        };
        
        render(<ActionButton {...props} />);
    });

    test("image should have correct src", () => {
        const props = { 
            icon: TestImage,
            text: "Test Action Button",  
        };

        render(<ActionButton {...props} />);

        const image = screen.getByAltText('action-button-icon');

        expect(image).toHaveAttribute('src', props.icon);
    });

    test("paragraph should have correct text", () => {
        const props = { 
            icon: TestImage,
            text: "Test Action Button",  
        };

        render(<ActionButton {...props} />);

        const paragraph = screen.getByText(props.text);

        expect(paragraph).toBeInTheDocument();
    });
});
