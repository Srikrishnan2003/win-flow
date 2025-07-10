import { Settings } from "lucide-react";
import { Button } from "./ui/button";

export default function SettingsButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:bg-slate-800 hover:text-slate-50"
        >
            <Settings />
            <span className="sr-only">Settings</span>
        </Button>
    )
}