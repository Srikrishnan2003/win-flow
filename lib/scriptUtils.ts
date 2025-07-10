import { TaskStep } from "@/types";

export const generateAhkScript = (steps: TaskStep[]): string => {
    return steps.map((step) => {
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
    }).join("\n");
}