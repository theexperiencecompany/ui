"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { HugeiconsIcon, ArrowDown01Icon, ToolsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { formatToolName, getToolCategoryIcon } from "@/lib/utils/tool-icons";
import { CompactMarkdown } from "@/registry/new-york/ui/compact-markdown";

// ============================================================================
// Types
// ============================================================================

export interface ToolCallEntry {
	/** Name of the tool that was called */
	tool_name: string;
	/** Category/integration the tool belongs to (e.g., "gmail", "search", "memory") */
	tool_category: string;
	/** Human-readable message describing what the tool did */
	message?: string;
	/** Whether to show the category label (default: true) */
	show_category?: boolean;
	/** Unique ID for this tool call */
	tool_call_id?: string;
	/** Input parameters passed to the tool */
	inputs?: Record<string, unknown>;
	/** Output/result from the tool */
	output?: string;
	/** URL to custom icon for integrations */
	icon_url?: string;
	/** Friendly name for the integration (e.g., "Linear", "Slack") */
	integration_name?: string;
}

export interface IntegrationInfo {
	iconUrl?: string;
	name?: string;
}

export interface ToolCallsSectionProps {
	/** Array of tool call entries to display */
	toolCalls: ToolCallEntry[];
	/** Optional map of integration IDs to their info for icon/name lookup */
	integrations?: Map<string, IntegrationInfo>;
	/** Maximum number of icons to show in the stacked display (default: 10) */
	maxIconsToShow?: number;
	/** Whether to start with the accordion expanded (default: false) */
	defaultExpanded?: boolean;
	/** Custom class name for the container */
	className?: string;
	/** Custom icon size (default: 21) */
	iconSize?: number;
	/** Custom icon renderer override */
	renderIcon?: (call: ToolCallEntry, size: number) => ReactNode;
	/** Custom content renderer override for inputs/outputs */
	renderContent?: (content: unknown) => ReactNode;
}

// ============================================================================
// Helper Components
// ============================================================================

interface ChevronIconProps {
	isExpanded: boolean;
	size?: number;
	className?: string;
}

function ChevronIcon({ isExpanded, size = 18, className = "" }: ChevronIconProps) {
	return (
		<HugeiconsIcon
			icon={ArrowDown01Icon}
			size={size}
			className={cn(
				"transition-transform duration-200",
				isExpanded && "rotate-180",
				className,
			)}
		/>
	);
}

// ============================================================================
// Main Component
// ============================================================================

export function ToolCallsSection({
	toolCalls,
	integrations,
	maxIconsToShow = 10,
	defaultExpanded = false,
	className,
	iconSize = 21,
	renderIcon,
	renderContent,
}: ToolCallsSectionProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);
	const [expandedCalls, setExpandedCalls] = useState<Set<number>>(new Set());

	// Create a lookup map for custom integrations by id
	const integrationLookup = useMemo(() => {
		if (integrations) return integrations;
		return new Map<string, IntegrationInfo>();
	}, [integrations]);

	// Helper to get icon_url with fallback to integrations lookup
	const getIconUrl = (call: ToolCallEntry): string | undefined => {
		if (call.icon_url) return call.icon_url;
		const integration = integrationLookup.get(call.tool_category);
		return integration?.iconUrl;
	};

	// Helper to get integration_name with fallback to integrations lookup
	const getIntegrationName = (call: ToolCallEntry): string | undefined => {
		if (call.integration_name) return call.integration_name;
		const integration = integrationLookup.get(call.tool_category);
		return integration?.name;
	};

	const toggleCallExpansion = (index: number) => {
		setExpandedCalls((prev) => {
			const next = new Set(prev);
			if (next.has(index)) next.delete(index);
			else next.add(index);
			return next;
		});
	};

	if (toolCalls.length === 0) return null;

	// Default icon renderer
	const defaultRenderIcon = (call: ToolCallEntry, size: number) => {
		const icon = getToolCategoryIcon(
			call.tool_category || "general",
			{ width: size, height: size },
			getIconUrl(call),
		);
		return icon || (
			<div className="p-1 min-w-8 min-h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 backdrop-blur">
				<HugeiconsIcon icon={ToolsIcon} size={size} />
			</div>
		);
	};

	const iconRenderer = renderIcon || defaultRenderIcon;

	// Default content renderer
	const defaultRenderContent = (content: unknown) => (
		<CompactMarkdown content={content} />
	);

	const contentRenderer = renderContent || defaultRenderContent;

	// Render stacked rotated icons (deduplicated by category for cleaner display)
	const renderStackedIcons = () => {
		const seenCategories = new Set<string>();
		const uniqueIcons = toolCalls.filter((call) => {
			const category = call.tool_category || "general";
			if (seenCategories.has(category)) return false;
			seenCategories.add(category);
			return true;
		});
		const displayIcons = uniqueIcons.slice(0, maxIconsToShow);

		return (
			<div className="flex min-h-8 items-center -space-x-2">
				{displayIcons.map((call, index) => (
					<div
						key={`${call.tool_name}-${index}`}
						className="relative flex min-w-8 items-center justify-center"
						style={{
							rotate:
								displayIcons.length > 1
									? index % 2 === 0
										? "8deg"
										: "-8deg"
									: "0deg",
							zIndex: index,
						}}
					>
						{iconRenderer(call, iconSize)}
					</div>
				))}
				{uniqueIcons.length > maxIconsToShow && (
					<div className="z-0 flex size-7 min-h-7 min-w-7 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-500 font-normal">
						+{uniqueIcons.length - maxIconsToShow}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className={cn("w-fit max-w-[35rem]", className)}>
			{/* Collapsible Header */}
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white text-zinc-500 cursor-pointer py-2"
			>
				{renderStackedIcons()}
				<span className="text-xs font-medium transition-all duration-200">
					Used {toolCalls.length} tool
					{toolCalls.length > 1 ? "s" : ""}
				</span>
				<ChevronIcon isExpanded={isExpanded} />
			</button>

			{/* Collapsible Content */}
			<div
				className={cn(
					"overflow-hidden transition-all duration-200",
					isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className="space-y-0 pt-1">
					{toolCalls.map((call, index) => {
						const hasCategoryText =
							call.show_category !== false &&
							call.tool_category &&
							call.tool_category !== "unknown";
						const hasDetails = call.inputs || call.output;
						const isCallExpanded = expandedCalls.has(index);

						return (
							<div
								key={`${call.tool_name}-step-${index}`}
								className="flex items-stretch gap-2"
							>
								{/* Icon column with connector line */}
								<div className="flex flex-col items-center self-stretch">
									<div className="min-h-8 min-w-8 flex items-center justify-center shrink-0">
										{iconRenderer(call, iconSize)}
									</div>
									{index < toolCalls.length - 1 && (
										<div className="w-px flex-1 bg-zinc-300 dark:bg-zinc-700 min-h-4" />
									)}
								</div>

								{/* Content column */}
								<div className="flex-1 min-w-0">
									<button
										type="button"
										className={cn(
											"flex items-center gap-1 group/parent",
											hasDetails ? "cursor-pointer" : "",
											!hasCategoryText ? "pt-2" : "",
										)}
										onClick={() => hasDetails && toggleCallExpansion(index)}
									>
										<p
											className={cn(
												"text-xs text-zinc-600 dark:text-zinc-400 font-medium",
												hasDetails && "group-hover/parent:text-zinc-900 dark:group-hover/parent:text-white",
											)}
										>
											{call.message || formatToolName(call.tool_name)}
										</p>
										{hasDetails && (
											<ChevronIcon isExpanded={isCallExpanded} size={14} />
										)}
									</button>

									{hasCategoryText && (
										<p className="text-[11px] text-zinc-400 dark:text-zinc-500 capitalize">
											{getIntegrationName(call) ||
												call.tool_category
													.replace(/_/g, " ")
													.split(" ")
													.map(
														(word) =>
															word.charAt(0).toUpperCase() +
															word.slice(1).toLowerCase(),
													)
													.join(" ")}
										</p>
									)}

									{isCallExpanded && hasDetails && (
										<div className="mt-2 space-y-2 text-[11px] bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-3 mb-3 w-fit">
											{call.inputs && Object.keys(call.inputs).length > 0 && (
												<div className="flex flex-col">
													<span className="text-zinc-400 dark:text-zinc-500 font-medium mb-1">
														Input
													</span>
													{contentRenderer(call.inputs)}
												</div>
											)}
											{call.output && (
												<div className="flex flex-col">
													<span className="text-zinc-400 dark:text-zinc-500 font-medium mb-1">
														Output
													</span>
													{contentRenderer(call.output)}
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ToolCallsSection;
