"use client";

import type { FC } from "react";
import {
	File01Icon,
	DocumentCodeIcon,
	Image01Icon,
	Txt01Icon,
	Video01Icon,
	MusicNote01Icon,
	Archive01Icon,
	Loading03Icon,
	Cancel01Icon,
	HugeiconsIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export interface UploadedFile {
	id: string;
	url: string;
	name: string;
	type: string;
	description?: string;
	isUploading?: boolean;
}

export interface FilePreviewProps {
	files: UploadedFile[];
	onRemove?: (id: string) => void;
	className?: string;
}

const getFileExtension = (fileName: string): string => {
	const parts = fileName.split(".");
	return parts.length > 1 ? parts[parts.length - 1] : "";
};

const getFileIcon = (fileType: string, fileName: string) => {
	const extension = getFileExtension(fileName).toLowerCase();
	const iconSize = 24;

	// Image files
	if (fileType.startsWith("image/"))
		return (
			<HugeiconsIcon
				icon={Image01Icon}
				size={iconSize}
				className="text-emerald-500 dark:text-emerald-400"
			/>
		);

	// Document files
	if (fileType === "application/pdf" || extension === "pdf")
		return (
			<HugeiconsIcon
				icon={Txt01Icon}
				size={iconSize}
				className="text-red-500 dark:text-red-400"
			/>
		);

	if (
		["doc", "docx", "odt", "rtf"].includes(extension) ||
		fileType.includes("wordprocessing") ||
		fileType.includes("msword")
	)
		return (
			<HugeiconsIcon
				icon={Txt01Icon}
				size={iconSize}
				className="text-blue-500 dark:text-blue-400"
			/>
		);

	// Spreadsheet files
	if (
		["xls", "xlsx", "csv", "ods"].includes(extension) ||
		fileType.includes("spreadsheet") ||
		fileType.includes("excel")
	)
		return (
			<HugeiconsIcon
				icon={Txt01Icon}
				size={iconSize}
				className="text-green-500 dark:text-green-400"
			/>
		);

	// Code/text files
	if (["txt", "md"].includes(extension) || fileType === "text/plain")
		return (
			<HugeiconsIcon
				icon={Txt01Icon}
				size={iconSize}
				className="text-zinc-500 dark:text-zinc-400"
			/>
		);

	if (
		[
			"js",
			"ts",
			"jsx",
			"tsx",
			"py",
			"java",
			"c",
			"cpp",
			"html",
			"css",
		].includes(extension) ||
		fileType.includes("javascript") ||
		fileType.includes("typescript")
	)
		return (
			<HugeiconsIcon
				icon={DocumentCodeIcon}
				size={iconSize}
				className="text-yellow-500 dark:text-yellow-400"
			/>
		);

	if (["json", "xml", "yaml", "yml"].includes(extension))
		return (
			<HugeiconsIcon
				icon={DocumentCodeIcon}
				size={iconSize}
				className="text-zinc-500 dark:text-zinc-400"
			/>
		);

	// Media files
	if (
		fileType.startsWith("video/") ||
		["mp4", "avi", "mov", "mkv"].includes(extension)
	)
		return (
			<HugeiconsIcon
				icon={Video01Icon}
				size={iconSize}
				className="text-purple-500 dark:text-purple-400"
			/>
		);

	if (
		fileType.startsWith("audio/") ||
		["mp3", "wav", "ogg"].includes(extension)
	)
		return (
			<HugeiconsIcon
				icon={MusicNote01Icon}
				size={iconSize}
				className="text-pink-500 dark:text-pink-400"
			/>
		);

	// Archive files
	if (
		["zip", "rar", "tar", "gz", "7z"].includes(extension) ||
		fileType.includes("archive") ||
		fileType.includes("compressed")
	)
		return (
			<HugeiconsIcon
				icon={Archive01Icon}
				size={iconSize}
				className="text-amber-500 dark:text-amber-400"
			/>
		);

	// Default fallback
	return (
		<HugeiconsIcon
			icon={File01Icon}
			size={iconSize}
			className="text-zinc-500 dark:text-zinc-400"
		/>
	);
};

const getFormattedFileType = (fileType: string, fileName: string): string => {
	const ext = getFileExtension(fileName).toUpperCase();

	if (fileType.includes("msword") || fileType.includes("wordprocessing"))
		return "DOC";

	if (fileType.includes("spreadsheet") || fileType.includes("excel"))
		return "SPREADSHEET";

	const typePart = fileType.split("/")[1];

	if (!typePart || typePart === "octet-stream") {
		return ext || "FILE";
	}

	const cleanType = typePart
		.replace("vnd.openxmlformats-officedocument.", "")
		.replace("vnd.ms-", "")
		.replace("x-", "")
		.replace("document.", "")
		.replace("presentation.", "")
		.replace("application.", "")
		.split(".")[0];

	return cleanType.toUpperCase().substring(0, 8);
};

export const FilePreview: FC<FilePreviewProps> = ({
	files,
	onRemove,
	className,
}) => {
	if (files.length === 0) return null;

	return (
		<div className={cn("flex w-full flex-col gap-2 rounded-xl p-2", className)}>
			<div className="flex w-full flex-wrap gap-2">
				{files.map((file) => (
					<div
						key={file.id}
						className={cn(
							"group relative flex items-center rounded-xl transition-all",
							"bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
							file.type.startsWith("image/")
								? "h-14 w-14 justify-center"
								: "min-w-[180px] max-w-[220px] p-2 pr-8",
						)}
					>
						{/* Loading overlay */}
						{file.isUploading && (
							<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 dark:bg-black/30">
								<HugeiconsIcon
									icon={Loading03Icon}
									size={20}
									className="animate-spin text-white"
								/>
							</div>
						)}

						{/* Remove button */}
						{onRemove && (
							<button
								type="button"
								onClick={() => onRemove(file.id)}
								className={cn(
									"absolute top-0 right-0 z-10 flex h-6 w-6 scale-90 items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100",
									"bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500",
								)}
								aria-label={`Remove ${file.name}`}
							>
								<HugeiconsIcon
									icon={Cancel01Icon}
									size={12}
									className="text-zinc-700 dark:text-white"
								/>
							</button>
						)}

						{/* Image preview */}
						{file.type.startsWith("image/") ? (
							<div className="h-12 w-12 overflow-hidden rounded-md">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={file.url}
									alt={file.name}
									className="h-full w-full object-cover"
								/>
							</div>
						) : (
							<>
								{/* File icon */}
								<div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-700">
									{getFileIcon(file.type, file.name)}
								</div>
								{/* File info */}
								<div className="flex min-w-0 flex-1 flex-col">
									<p className="truncate text-sm font-medium text-zinc-800 dark:text-white">
										{file.name.length > 18
											? `${file.name.substring(0, 15)}...`
											: file.name}
									</p>
									<span className="text-xs text-zinc-500 dark:text-zinc-400">
										{getFormattedFileType(file.type, file.name)}
									</span>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
