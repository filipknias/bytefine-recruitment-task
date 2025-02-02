import { render, screen } from "@testing-library/react"
import { test, describe } from 'vitest';
import TextColor from "@/components/atoms/TextColor";


describe("TextColor", () => {
    test("renders component", () => {
        const props = { 
            selected: true, 
            color: "red", 
            onClick: () => {} 
        };
        
        render(<TextColor {...props} />);
    });

    test("should render color indicator with correct background color", () => {
        const props = { 
            selected: true, 
            color: "red", 
            onClick: () => {} 
        };

        render(<TextColor {...props} />);

        const innerColorDiv = screen.getByTestId("color-indicator");
        expect(innerColorDiv).toBeInTheDocument();
        expect(innerColorDiv).toHaveStyle({ backgroundColor: props.color });
    });

    test("should render color button with correct border color", () => {
        const props = { 
            selected: true, 
            color: "red", 
            onClick: () => {} 
        };

        render(<TextColor {...props} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle({ borderColor: "white" });
    });

    test("should render color button with transparent border", () => {
        const props = { 
            selected: false, 
            color: "red", 
            onClick: () => {} 
        };

        render(<TextColor {...props} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle({ borderColor: "transparent" });
    });
});
