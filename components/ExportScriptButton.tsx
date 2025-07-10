"use client";

import { Button } from "./ui/button";
import { TaskStep } from "@/types";
import { generateAhkScript } from "@/lib/scriptUtils";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

type Props = {
    steps: TaskStep[];
};

const ExportScriptButton = ({ steps }: Props) => {
    const handleExport = () => {
        const scriptContent = generateAhkScript(steps);
        const blob = new Blob([scriptContent], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "winflow_script.ahk");
    };

    return (
        <Button 
            onClick={handleExport} 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 w-full shadow-lg" 
            disabled={steps.length === 0}
        >
            <Download /> Export .ahk Script
        </Button>
    );
};

export default ExportScriptButton;