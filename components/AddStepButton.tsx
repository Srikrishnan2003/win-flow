import { File, Folder, Globe, Keyboard, Plus, Timer } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type Props = {
    onAddStep?: (type: string) => void;
}

const AddStepButton = ({ onAddStep }: Props) => {
    const [open, setOpen] = useState(false);

    const stepOptions = [
        { label: "Open File", type: "open_file", icon: <File className="h-5 w-5 text-blue-500" /> },
        { label: "Wait", type: "wait", icon: <Timer className="h-5 w-5 text-yellow-500" /> },
        { label: "Send Keystrokes", type: "send_keys", icon: <Keyboard className="h-5 w-5 text-gray-500" /> },
        { label: "Open Website", type: "open_website", icon: <Globe className="h-5 w-5 text-green-500" /> },
        { label: "Open Folder", type: "open_folder", icon: <Folder className="h-5 w-5 text-orange-500" /> },
    ];

    const handleStepClick = (type: string) => {
        if (onAddStep) onAddStep(type);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg w-full">
                    <Plus /> Add Step
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%] max-w-2xl bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                    <DialogTitle>Select a new step</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    {stepOptions.map((step) => (
                        <button
                            key={step.type}
                            onClick={() => handleStepClick(step.type)}
                            className="flex items-center gap-4 p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 ease-in-out transform hover:scale-105 border border-slate-700"
                        >
                            {step.icon}
                            <span className="font-semibold text-base">{step.label}</span>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddStepButton;