"use client";

import { useCallback } from "react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
}

export default function FileUpload({
  file,
  onFileChange,
  accept = "application/pdf",
  disabled = false,
}: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      const f = e.dataTransfer.files[0];
      if (f?.type === "application/pdf") onFileChange(f);
    },
    [disabled, onFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f?.type === "application/pdf") onFileChange(f);
      e.target.value = "";
    },
    [onFileChange]
  );

  const clearFile = useCallback(() => {
    onFileChange(null);
  }, [onFileChange]);

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50"
            : "cursor-pointer border-slate-300 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/50"
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
          id="invoice-upload"
        />
        <label
          htmlFor="invoice-upload"
          className={`cursor-pointer ${disabled ? "pointer-events-none" : ""}`}
        >
          {file ? (
            <div>
              <p className="font-medium text-slate-800">{file.name}</p>
              <p className="mt-1 text-sm text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  clearFile();
                }}
                className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Remove file
              </button>
            </div>
          ) : (
            <>
              <p className="text-slate-600">
                Drag and drop a PDF here, or{" "}
                <span className="font-medium text-emerald-600">
                  choose a file
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-500">PDF only</p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
