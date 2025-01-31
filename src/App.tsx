import ActionButton from "@/components/molecules/ActionButton";
import { UIElements } from "@/data/UIElements";
import CanvasEditorLogo from "@/assets/canvas-editor-logo.svg";
import ResetIcon from "@/assets/reset-icon.svg";
import PrimaryButton from "./components/atoms/PrimaryButton";
import TextArea from "./components/organisms/TextArea";

export default function App() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <div className="w-full bg-black-50 flex items-center justify-center" style={{ height: 948 }}>
                        <TextArea />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 mb-8 border-b-2 border-white-primary">
                            <div className="flex items-center">
                                <img className="h-16 mr-2" src={CanvasEditorLogo} alt="canvas-editor-logo" />
                                <h2 className="text-black-75 font-bold text-display">CanvasEditor</h2>
                            </div>
                            <button className="text-red-primary cursor-pointer inline-flex items-center pb-1 border-b border-red-primary">
                                <span className="font-medium text-body mr-1">Reset</span>
                                <img className="h-6" src={ResetIcon} alt="reset-icon" />
                            </button>
                        </div>
                        <div className="mb-8 bg-white-secondary rounded-lg px-4 py-6">
                            <h3 className="text-black-100 font-bold text-body">Add content</h3>
                        </div>
                        <div className="flex-1 pb-12 mb-8 border-b-2 border-white-primary">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {UIElements.map((element) => (
                                    <ActionButton 
                                        key={element.label}
                                        icon={element.icon} 
                                        text={element.label} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton>Export to PNG</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
