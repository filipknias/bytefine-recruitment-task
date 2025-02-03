import ResetIcon from "@/assets/reset-icon.svg";
import CloseIcon from "@/assets/close-icon.svg";
import WarningIcon from "@/assets/warning-icon.svg";
import PrimaryButton from "../atoms/PrimaryButton";
import { useState } from "react";
import { useCanvasStore } from "@/store/useCanvasStore";

export default function ResetModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const { resetCanvas } = useCanvasStore();

    const clearCanvas = () => {
        setModalOpen(false);
        resetCanvas();
    };

    return (
        <>
            <button onClick={() => setModalOpen(true)} className="text-red-primary cursor-pointer inline-flex items-center pb-1 border-b border-red-primary">
                <span className="font-medium text-body mr-1">Reset</span>
                <img className="h-6" src={ResetIcon} alt="reset-icon" />
            </button>
            {modalOpen && (
                <div data-testid="modal" className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl mx-auto py-12 px-8 md:px-32 relative">
                        <button className="absolute top-8 right-8 cursor-pointer">
                            <img 
                                onClick={() => setModalOpen(false)}
                                className="w-8 h-8" 
                                src={CloseIcon} 
                                alt="close-modal-icon" 
                            />
                        </button>
                        <img className="mx-auto h-48" src={WarningIcon} alt="warning-icon" />
                        <h2 className="uppercase text-display font-bold text-black-100 mb-4 text-center">WARNING</h2>
                        <p className="text-center text-black-75 font-medium text-body mb-12 max-w-sm mx-auto">You’re about to reset whole process. Are you sure you want to do it?</p>
                        <div className="flex items-center justify-center flex-wrap gap-8">
                            <button onClick={() => setModalOpen(false)} className="text-black-100 font-medium text-body cursor-pointer">Cancel</button>
                            <PrimaryButton onClick={clearCanvas}>Reset</PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
