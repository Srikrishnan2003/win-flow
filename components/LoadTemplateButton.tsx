import { Folder } from "lucide-react";
import { Button } from "./ui/button";

export default function LoadTemplateButton() {
    return (
        <Button variant="outline" className="bg-transparent border-slate-600 hover:bg-slate-800 hover:text-slate-50">
            <Folder /> Load Template
        </Button>
    )
}