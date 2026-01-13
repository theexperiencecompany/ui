"use client";

import type { ReactNode } from "react";

export interface CompactMarkdownProps {
	content: unknown;
	className?: string;
}

/**
 * Helper to check if a value looks like structured data (object/array/JSON)
 */
const isStructuredData = (value: unknown): boolean => {
	if (typeof value === "object" && value !== null) return true;
	if (typeof value === "string") {
		const trimmed = value.trim();
		return (
			(trimmed.startsWith("{") && trimmed.endsWith("}")) ||
			(trimmed.startsWith("[") && trimmed.endsWith("]"))
		);
	}
	return false;
};

/**
 * Try to parse and format JSON-like strings
 */
const formatJsonLikeString = (str: string): string => {
	try {
		const parsed = JSON.parse(str);
		return JSON.stringify(parsed, null, 2);
	} catch {
		// If it looks like truncated JSON, try to format it anyway
		return str;
	}
};

/**
 * Normalize content for display
 */
const normalizeValue = (content: unknown): { data: unknown; isStructured: boolean } => {
	if (typeof content === "object" && content !== null) {
		return { data: content, isStructured: true };
	}
	if (typeof content === "string") {
		const trimmed = content.trim();
		const looksLikeJson =
			(trimmed.startsWith("{") && (trimmed.endsWith("}") || trimmed.includes("}"))) ||
			(trimmed.startsWith("[") && (trimmed.endsWith("]") || trimmed.includes("]")));
		if (looksLikeJson) {
			return { data: content, isStructured: true };
		}
		return { data: content, isStructured: false };
	}
	return { data: String(content), isStructured: false };
};

/**
 * Compact display for structured data and markdown content.
 * Accepts any value and automatically formats it appropriately:
 * - Objects/Arrays: Pretty-printed JSON
 * - Strings that look like JSON: Formatted with indentation (even if truncated)
 * - Other strings: Simple text rendering or markdown if react-markdown available
 */
export function CompactMarkdown({ content, className = "" }: CompactMarkdownProps) {
	const { data, isStructured } = normalizeValue(content);

	const baseClasses = "bg-zinc-900/50 rounded-xl p-3 max-h-60 overflow-y-auto text-xs text-zinc-400 w-fit max-w-[32rem]";

	// For structured data, render as preformatted text
	if (isStructured) {
		const displayText =
			typeof data === "string"
				? formatJsonLikeString(data)
				: JSON.stringify(data, null, 2);

		return (
			<pre className={`${baseClasses} whitespace-pre-wrap break-words ${className}`}>
				{displayText}
			</pre>
		);
	}

	// For text content, render with basic formatting
	const textContent = String(data);

	return (
		<div className={`${baseClasses} leading-relaxed ${className}`}>
			{textContent}
		</div>
	);
}

export default CompactMarkdown;
