import { render, fireEvent } from "@testing-library/react"
import { test, describe } from 'vitest';
import ResetModal from "@/components/organisms/ResetModal";
import '@testing-library/jest-dom';

describe("ResetModal", () => {
    test("renders component", () => {
        render(<ResetModal />);
    });

    test("should open modal after reset button click", () => {
        const { getByText, getByTestId } = render(<ResetModal />);

        const resetButton = getByText('Reset');
        fireEvent.click(resetButton);

        const modal = getByTestId('modal');

        expect(modal).toBeInTheDocument();
    });

    test("should close modal after cancel button click", () => {
        const { getByText, getByTestId } = render(<ResetModal />);

        const resetButton = getByText('Reset');

        fireEvent.click(resetButton);

        const modal = getByTestId('modal');
        const cancelButton = getByText('Cancel');

        expect(modal).toBeInTheDocument();

        fireEvent.click(cancelButton);

        expect(modal).not.toBeInTheDocument();
    });
})
