import { render, fireEvent, screen } from "@testing-library/react"
import { test, describe } from 'vitest';
import ResetModal from "@/components/organisms/ResetModal";

describe("ResetModal", () => {
    test("renders component", () => {
        render(<ResetModal />);
    });

    test("should open modal after reset button click", () => {
        render(<ResetModal />);

        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        const modal = screen.getByTestId('modal');

        expect(modal).toBeInTheDocument();
    });

    test("should close modal after cancel button click", () => {
        render(<ResetModal />);

        const resetButton = screen.getByText('Reset');

        fireEvent.click(resetButton);

        const modal = screen.getByTestId('modal');
        const cancelButton = screen.getByText('Cancel');

        expect(modal).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(modal).not.toBeInTheDocument();
    });
})
