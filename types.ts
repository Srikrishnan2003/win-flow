export type TaskStep = {
    id: string;
    type: "open_file" | "wait" | "send_keys" | "open_website" | "open_folder";
    data: {
        value: string;
        label?: string;
        fileType?: "app" | "pdf" | "image";
    };
};