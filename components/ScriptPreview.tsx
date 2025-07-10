"use client";

import { TaskStep } from "@/types";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
    steps: TaskStep[];
};

const generateAhkLine = (step: TaskStep): string => {
    const val = step.data?.value || "";

    switch(step.type) {
        case "open_file":
            return `Run, "${step.data?.value || ""}"`;

        case "wait":
            return `Sleep, ${val}`;

        case "send_keys":
            return `Send, ${val}`;

        case "open_website":
            return `Run, "${val}"`;

        case "open_folder":
            return `Run, "${val}"`;

        default:
            return `; Unknown step: ${step.type}`;
    }
};

const ScriptPreview = ({ steps }: Props) => {
    const script = steps.map(generateAhkLine).join("\n");

    return (
        <Card className="bg-slate-900 text-sky-300 border-slate-700 shadow-inner">
            <CardContent className="p-0">
                <ScrollArea className="h-[300px] w-full">
                    <pre className="p-4 text-sm font-mono whitespace-pre-wrap">{script || "; Your AHK script will appear here...."}</pre>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ScriptPreview;

