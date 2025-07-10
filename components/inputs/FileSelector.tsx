"use client";

import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

type FileSelectorProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    filters: { name: string; extensions: string[] }[]
};

const FileSelector = ({ label, value, onChange, filters }: FileSelectorProps) => {
    const [loading, setLoading] = useState(false);

    const handleBrowse = async () => {
        try {
            setLoading(true);
            const selected = await open({
                multiple: false,
                filters: filters,
            });

            if (typeof selected === "string") {
                onChange(selected);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-1">
            <Label className="block mb-1">{label}</Label>
            <div className="flex gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-slate-900 border-slate-700"
                    placeholder="Choose a file or paste path"
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleBrowse}
                    disabled={loading}
                    className="bg-transparent border-slate-600 hover:bg-slate-800 hover:text-slate-50"
                >
                    Browse
                </Button>
            </div>
        </div>
    );
};

export default FileSelector;


