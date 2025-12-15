"use client";

import { CodeBlock } from "@/components/core/code-block";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Tick02Icon,
	Copy01Icon,
	Download01Icon,
	HugeiconsIcon,
} from "@/components/icons";
import * as React from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

interface SourceCodeClientProps {
	code: string;
	title?: string;
	language: string;
}

/**
 * Get devicon class based on file extension/language
 */
function getDeviconClass(language: string): string {
	const iconMap: Record<string, string> = {
		tsx: "devicon-react-original colored",
		ts: "devicon-typescript-plain colored",
		jsx: "devicon-react-original colored",
		js: "devicon-javascript-plain colored",
		css: "devicon-css3-plain colored",
		html: "devicon-html5-plain colored",
		json: "devicon-json-plain colored",
		md: "devicon-markdown-original",
		py: "devicon-python-plain colored",
		java: "devicon-java-plain colored",
		go: "devicon-go-original-wordmark colored",
		rust: "devicon-rust-original colored",
		cpp: "devicon-cplusplus-plain colored",
		c: "devicon-c-plain colored",
	};

	return iconMap[language] || "devicon-typescript-plain colored";
}

/**
 * Client component to render source code with syntax highlighting
 */
export function SourceCodeClient({
	code,
	title,
	language,
}: SourceCodeClientProps) {
	const [html, setHtml] = React.useState("");
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		codeToHtml(code, {
			lang: language as BundledLanguage,
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		}).then(setHtml);
	}, [code, language]);

	const handleDownload = () => {
		const blob = new Blob([code], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = title || `file.${language}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleCopy = async () => {
		if (title) {
			await navigator.clipboard.writeText(title);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="my-6 rounded-lg border overflow-hidden">
			{title && (
				<div className="flex items-center justify-between gap-2 bg-muted/50 px-4 py-3 border-b">
					<div className="flex items-center gap-2">
						<i className={getDeviconClass(language)} />
						<span className="text-sm font-medium font-mono">{title}</span>
					</div>
					<TooltipProvider>
						<div className="flex items-center gap-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={handleCopy}
										className="h-7 w-7 p-0"
									>
										{copied ? (
											<HugeiconsIcon icon={Tick02Icon} size={14} />
										) : (
											<HugeiconsIcon icon={Copy01Icon} size={14} />
										)}
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{copied ? "Copied!" : "Copy filename"}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={handleDownload}
										className="h-7 w-7 p-0"
									>
										<HugeiconsIcon icon={Download01Icon} size={14} />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Download file</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</div>
			)}
			<CodeBlock
				raw={code}
				className="max-h-[500px] overflow-auto m-0 rounded-none border-0"
			>
				<code
					className="font-mono text-sm"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</CodeBlock>
		</div>
	);
}
