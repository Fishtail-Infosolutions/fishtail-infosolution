"use client";

import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { useMemo } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-72 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800" />
});

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "color",
        "background",
        "blockquote",
        "code-block",
        "link",
        "image",
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || "Write something amazing..."}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:dark:border-gray-800 [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:dark:bg-gray-800/50 [&_.ql-container]:border-gray-200 [&_.ql-container]:dark:border-gray-800 [&_.ql-container]:min-h-[300px] [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor.ql-blank::before]:text-gray-400 [&_.ql-editor.ql-blank::before]:italic"
            />
        </div>
    );
};

export default RichTextEditor;
