"use client";

import { TaskStep } from "@/types";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, Delete } from "lucide-react";
import FileSelector from "./inputs/FileSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import FolderSelector from "./inputs/FolderSelector";

type Props = {
    step: TaskStep;
    index: number;
    totalSteps: number;
    onValueChange: (id: string, value: string, key: keyof TaskStep["data"]) => void;
    onDelete: (id: string) => void;
    onMove: (index: number, direction: "up" | "down") => void;
    onLabelChange: (id: string, label: string) => void;
};

const StepCard = ({ 
    step, 
    index, 
    totalSteps,
    onValueChange,
    onDelete,
    onMove,
    onLabelChange
}: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(step.id, e.target.value, "label");
    };

    const value = step.data?.value || "";

    const renderInput = () => {
        switch (step.type) {
            case "open_file":
                return (
                    <>
                        <Label>Select File Type</Label>
                        <Select
                            value={step.data?.fileType || ""}
                            onValueChange={(val) =>
                                onValueChange(step.id, val, "fileType")
                            }
                        >
                           <SelectTrigger>
                                <SelectValue placeholder="Choose file type"/>
                            </SelectTrigger> 
                            <SelectContent>
                                <SelectItem value="app">Application (.exe)</SelectItem>
                                <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                                <SelectItem value="image">Image (.png, .jpg)</SelectItem>
                            </SelectContent>
                        </Select>

                        <FileSelector
                            label={`Select ${step.data?.fileType || "file"}`}
                            value={value}
                            onChange={(val) => onValueChange(step.id, val, "value")}
                            filters={
                                step.data?.fileType === "app"
                                    ? [{ name: "Executable", extensions: ["exe"] }]
                                    : step.data?.fileType === "pdf"
                                    ? [{ name: "PDF", extensions: ["pdf"] }]
                                    : step.data?.fileType === "image"
                                    ? [{ name: "Image", extensions: ["png", "jpg", "jpeg", "webp"] }]
                                    : []
                            }
                        />
                    </>
                );

            case "send_keys":
                    return (
                        <>
                            <Label>Keystrokes</Label>
                            <Input
                                type="text"
                                placeholder="e.g., ^a (Ctrl + A)"
                                value={value}
                                onChange={(e) => onValueChange(step.id, e.target.value, "value")}
                            />

                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                {[
                                    { label: "Ctrl", code: "^" },
                                    { label: "Alt", code: "!" },
                                    { label: "Shift", code: "+" },
                                    { label: "Enter", code: "{Enter}" },
                                    { label: "Tab", code: "{Tab}" },
                                    { label: "Esc", code: "{Esc}" },
                                    { label: "Backsapce", code: "{Backspace}" }
                                ].map(({ label, code }) => (
                                    <Button
                                        key={label}
                                        variant="outline"
                                        size="sm"
                                        className="px-2 py-1"
                                        onClick={() => onValueChange(step.id, value + code, "value")}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div> 
                        </>
                    );

            case "open_website":
                    return (
                        <>
                            <Label>Website URL</Label>
                            <Input 
                                type="url"
                                placeholder="https://example.com"
                                value={value}
                                onChange={handleChange}
                            />
                        </> 
                    );

            case "open_folder":
                    return (
                        <>
                            <FolderSelector
                                label="Select Folder"
                                value={value}
                                onChange={(val) => onValueChange(step.id, val, "value")}
                            />
                        </> 
                    );

            default:
                return <p className="text-red-500">Unknown step type</p>

        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-300">
            <p className="text-sm text-gray-600">Step {index + 1}</p>
            <h3 className="text-lg font-semibold capitalize">
                {step.data?.label?.trim() || step.type.replace(/_/g, " ")}
            </h3>
            <div className="mb-2">
                <Label className="my-2">Step Label (optional)</Label>
                <Input
                    type="text"
                    placeholder="e.g., Open VS Code"
                    value={step.data?.label || ""}
                    onChange={(e) => onLabelChange(step.id, e.target.value)}
                />
            </div>
            <div className="space-y-1">{renderInput()}</div>
            <div className="flex gap-2 mt-3">
                <Button
                    variant="ghost"
                    className="text-red-600 text-sm hover:underline"
                    onClick={() => onDelete(step.id)}
                >
                    <Delete /> Delete
                </Button>
                <Button
                    variant="ghost"
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => onMove(index, "up")}
                    disabled={index === 0}
                >
                    <ArrowUp /> Move Up
                </Button>
                <Button
                    variant="ghost"
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => onMove(index, "down")}
                    disabled={index === totalSteps-1}
                >
                    <ArrowDown /> Move Down
                </Button>
            </div>
        </div>
    );
};

export default StepCard;