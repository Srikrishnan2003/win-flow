"use client";

import React from "react";
import LoadTemplateButton from "./LoadTemplateButton";
import SettingsButton from "./SettingsButton";

const TopBar = () => {
    return (
        <header className="sticky top-0 z-50 w-full flex items-center justify-between bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 shadow-lg border-b border-slate-700/80">
            <h1 className="text-xl font-bold text-slate-50 tracking-tight">
                Win<span className="text-blue-400">Flow</span>
            </h1>
            <div className="flex items-center space-x-2">
                <LoadTemplateButton />
                <SettingsButton />
            </div>
        </header>
    );
};

export default TopBar;