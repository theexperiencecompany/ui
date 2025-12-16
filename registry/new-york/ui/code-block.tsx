"use client";

import { type FC, useEffect, useState } from "react";
import { type BundledLanguage, codeToHtml } from "shiki";
import {
	Copy01Icon,
	Download01Icon,
	HugeiconsIcon,
	Tick02Icon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

// Devicon class mapping for language icons
const deviconMap: Record<string, string> = {
	javascript: "devicon-javascript-plain colored",
	js: "devicon-javascript-plain colored",
	typescript: "devicon-typescript-plain colored",
	ts: "devicon-typescript-plain colored",
	tsx: "devicon-react-original colored",
	jsx: "devicon-react-original colored",
	python: "devicon-python-plain colored",
	py: "devicon-python-plain colored",
	java: "devicon-java-plain colored",
	cpp: "devicon-cplusplus-plain colored",
	c: "devicon-c-plain colored",
	csharp: "devicon-csharp-plain colored",
	cs: "devicon-csharp-plain colored",
	ruby: "devicon-ruby-plain colored",
	rb: "devicon-ruby-plain colored",
	go: "devicon-go-original-wordmark colored",
	rust: "devicon-rust-original colored",
	rs: "devicon-rust-original colored",
	php: "devicon-php-plain colored",
	swift: "devicon-swift-plain colored",
	kotlin: "devicon-kotlin-plain colored",
	kt: "devicon-kotlin-plain colored",
	html: "devicon-html5-plain colored",
	css: "devicon-css3-plain colored",
	json: "devicon-json-plain colored",
	xml: "devicon-xml-plain colored",
	yaml: "devicon-yaml-plain colored",
	yml: "devicon-yaml-plain colored",
	markdown: "devicon-markdown-original",
	md: "devicon-markdown-original",
	bash: "devicon-bash-plain colored",
	shell: "devicon-bash-plain colored",
	sh: "devicon-bash-plain colored",
	sql: "devicon-mysql-plain colored",
	docker: "devicon-docker-plain colored",
	dockerfile: "devicon-docker-plain colored",
	react: "devicon-react-original colored",
	vue: "devicon-vuejs-plain colored",
	angular: "devicon-angularjs-plain colored",
	svelte: "devicon-svelte-plain colored",
	nodejs: "devicon-nodejs-plain colored",
};

// Map common language names to shiki-supported languages
const languageMap: Record<string, BundledLanguage> = {
	javascript: "javascript",
	js: "javascript",
	typescript: "typescript",
	ts: "typescript",
	tsx: "tsx",
	jsx: "jsx",
	python: "python",
	py: "python",
	java: "java",
	cpp: "cpp",
	c: "c",
	csharp: "csharp",
	cs: "csharp",
	ruby: "ruby",
	rb: "ruby",
	go: "go",
	rust: "rust",
	rs: "rust",
	php: "php",
	swift: "swift",
	kotlin: "kotlin",
	kt: "kotlin",
	html: "html",
	css: "css",
	json: "json",
	xml: "xml",
	yaml: "yaml",
	yml: "yaml",
	markdown: "markdown",
	md: "markdown",
	bash: "bash",
	shell: "bash",
	sh: "bash",
	sql: "sql",
};

export interface CodeBlockProps {
	children: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
	className?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({
	children,
	language = "plaintext",
	filename,
	showLineNumbers = false,
	className,
}) => {
	const [copied, setCopied] = useState(false);
	const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

	useEffect(() => {
		const mappedLang = languageMap[language.toLowerCase()];
		if (!mappedLang) {
			// No highlighting for unknown languages
			setHighlightedHtml(null);
			return;
		}

		codeToHtml(children, {
			lang: mappedLang,
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		})
			.then(setHighlightedHtml)
			.catch(() => setHighlightedHtml(null));
	}, [children, language]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const extension = getFileExtension(language);
		const blob = new Blob([children], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename || `code.${extension}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const lines = children.split("\n");
	const deviconClass =
		deviconMap[language.toLowerCase()] || deviconMap[language];

	return (
		<div
			className={cn(
				"relative my-4 rounded-lg border overflow-hidden",
				"border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950",
				className,
			)}
		>
			{/* Header */}
			<div
				className={cn(
					"flex items-center justify-between border-b px-4 py-2",
					"border-zinc-200 bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-900/50",
				)}
			>
				<div className="flex items-center gap-2">
					{deviconClass ? (
						<i className={cn(deviconClass, "text-base")} aria-hidden="true" />
					) : (
						<span
							className={cn(
								"rounded px-2 py-0.5 text-xs",
								"bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
							)}
						>
							{language}
						</span>
					)}
					{filename && (
						<span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
							{filename}
						</span>
					)}
				</div>
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={handleDownload}
						className={cn(
							"rounded-md p-1.5 transition-colors",
							"text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700",
							"dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
						)}
						aria-label="Download code"
					>
						<HugeiconsIcon icon={Download01Icon} size={16} />
					</button>
					<button
						type="button"
						onClick={handleCopy}
						className={cn(
							"rounded-md p-1.5 transition-colors",
							"text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700",
							"dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
						)}
						aria-label="Copy code"
					>
						{copied ? (
							<HugeiconsIcon
								icon={Tick02Icon}
								size={16}
								className="text-green-500"
							/>
						) : (
							<HugeiconsIcon icon={Copy01Icon} size={16} />
						)}
					</button>
				</div>
			</div>

			{/* Code content */}
			<div className="overflow-x-auto">
				{highlightedHtml ? (
					<div className="flex">
						{showLineNumbers && (
							<div className="flex-shrink-0 py-4 pl-4 pr-2 select-none text-right text-sm text-zinc-400 dark:text-zinc-600">
								{lines.map((_, i) => (
									<div key={`line--${_}-${i}`}>{i + 1}</div>
								))}
							</div>
						)}
						<div
							className="flex-1 p-4 text-sm [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is saf
							dangerouslySetInnerHTML={{ __html: highlightedHtml }}
						/>
					</div>
				) : (
					<pre className="p-4">
						<code className="text-sm text-zinc-800 dark:text-zinc-100">
							{showLineNumbers ? (
								<div className="flex">
									<div className="mr-4 select-none text-zinc-400 dark:text-zinc-600">
										{lines.map((_, i) => (
											<div key={`line-${i}`} className="text-right">
												{i + 1}
											</div>
										))}
									</div>
									<div className="flex-1">{children}</div>
								</div>
							) : (
								children
							)}
						</code>
					</pre>
				)}
			</div>
		</div>
	);
};

// Helper function to get file extension from language
function getFileExtension(language: string): string {
	const extensionMap: Record<string, string> = {
		javascript: "js",
		typescript: "ts",
		python: "py",
		java: "java",
		cpp: "cpp",
		c: "c",
		csharp: "cs",
		ruby: "rb",
		go: "go",
		rust: "rs",
		php: "php",
		swift: "swift",
		kotlin: "kt",
		html: "html",
		css: "css",
		json: "json",
		xml: "xml",
		yaml: "yaml",
		markdown: "md",
		bash: "sh",
		shell: "sh",
		sql: "sql",
	};

	return extensionMap[language.toLowerCase()] || "txt";
}
