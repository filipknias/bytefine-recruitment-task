import { render, screen } from "@testing-library/react"
import { test, describe } from 'vitest';
import TextArea from "@/components/organisms/TextArea";
import { canvasTextColors } from "@/data/canvas";

describe("TextArea", () => {
    test("renders component", () => {
        const props = {
            id: Math.random().toString(),
            position: { x: 0, y: 0 },
            size: { width: 100, height: 100 }
        };

        render(<TextArea {...props} />);
    });

    test("textarea text color should be first of the canvasTextColors", () => {
        const props = {
            id: Math.random().toString(),
            position: { x: 0, y: 0 },
            size: { width: 100, height: 100 }
        };

        render(<TextArea {...props} />);

        const textarea = screen.getByRole('textbox');

        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveStyle({ color: canvasTextColors[0] });
    });
})
