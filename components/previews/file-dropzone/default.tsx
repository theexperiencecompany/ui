"use client";

import {
  type DroppedFile,
  FileDropzone,
} from "@/registry/new-york/ui/file-dropzone";

export default function FileDropzoneDefault() {
  const handleFilesDropped = (files: DroppedFile[]) => {
    console.log("Files dropped:", files);
  };

  const initialFiles: DroppedFile[] = [
    {
      id: "demo-1",
      file: new File([""], "gaia.png", { type: "image/png" }),
      preview: "/media/macos.webp",
    },
    {
      id: "demo-2",
      file: new File([""], "field.png", { type: "image/png" }),
      preview: "/images/wallpapers/field.webp",
    },
  ];

  // Override file sizes for display (since mock files have 0 bytes)
  Object.defineProperty(initialFiles[0].file, "size", { value: 2457600 }); // 2.4MB
  Object.defineProperty(initialFiles[1].file, "size", { value: 847872 }); // 828KB

  return (
    <div className="w-full max-w-md">
      <FileDropzone
        onFilesDropped={handleFilesDropped}
        accept="image/*,.pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        maxFiles={5}
        initialFiles={initialFiles}
      />
    </div>
  );
}
