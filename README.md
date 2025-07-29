# WinFlow

WinFlow is a simple yet powerful desktop application for building and exporting automation scripts for Windows. With an intuitive user interface, you can create a sequence of tasks, see a live preview of the corresponding script, and export it as a runnable AutoHotkey (`.ahk`) file.

## Key Features

-   **Intuitive Workflow Builder**: Add, configure, and reorder steps in your automation sequence.
-   **Multiple Step Types**: Supports common automation tasks:
    -   Open Files (.exe, .pdf, .png, etc.)
    -   Open Folders
    -   Open Websites
    -   Send Keystrokes (including special keys like Ctrl, Alt, Shift, and Enter)
    -   Wait for a specified duration
-   **Drag-and-Drop Interface**: Easily rearrange the order of your workflow steps.
-   **Live Script Preview**: Instantly see the generated AutoHotkey script as you build your workflow.
-   **Export to `.ahk`**: Save your entire workflow as a standard AutoHotkey script file that can be executed on any Windows machine with AutoHotkey installed.
-   **Modern Tech Stack**: Built with Next.js, Tauri, shadcn/ui, and TypeScript for a fast and reliable experience.

## How It Works

1.  **Add a Step**: Click the "Add Step" button and choose the type of action you want to perform (e.g., "Open File", "Send Keystrokes").
2.  **Configure the Step**: Fill in the required details for the step.
    -   For "Open File" or "Open Folder", you can browse for the item or paste the path directly.
    -   For "Send Keystrokes", type the desired keys or use the quick buttons for modifiers like `Ctrl` (`^`) or `Alt` (`!`).
    -   Optionally, give each step a custom label for better organization (e.g., "Open VS Code").
3.  **Arrange Your Workflow**: Drag and drop the step cards to reorder them as needed.
4.  **Preview the Script**: The "Live Script Preview" panel on the right updates in real-time, showing you the exact AutoHotkey code being generated.
5.  **Export**: Once your workflow is complete, click "Export .ahk Script" to download the script file to your computer.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Rust and Cargo](https://www.rust-lang.org/tools/install)
-   [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) for your specific operating system.

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/srikrishnan2003/win-flow.git
    cd win-flow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application in development mode:**
    ```bash
    npm run tauri dev
    ```

4.  **Build the application for production:**
    ```bash
    npm run tauri build
    ```
    The executable will be located in the `src-tauri/target/release/` directory.

## Project Structure

-   `app/`: Contains the main Next.js page and layout.
-   `components/`: The core React components for the application.
    -   `TaskFlowBuilder.tsx`: The main component that manages the state of the workflow steps.
    -   `StepCard.tsx`: UI for a single step in the workflow, including its inputs and actions.
    -   `ScriptPreview.tsx`: Displays the generated AutoHotkey script.
    -   `ExportScriptButton.tsx`: Handles the logic for exporting the script to a `.ahk` file.
    -   `inputs/`: Reusable input components like `FileSelector` and `FolderSelector` that use the Tauri dialog API.
    -   `ui/`: UI components from shadcn/ui.
-   `lib/`: Utility and helper functions.
    -   `scriptUtils.ts`: Contains the `generateAhkScript` function which converts the step objects into an AutoHotkey script string.
-   `types.ts`: Defines the TypeScript types used throughout the application, most notably `TaskStep`.
-   `src-tauri/`: Configuration files for the Tauri desktop application framework.
