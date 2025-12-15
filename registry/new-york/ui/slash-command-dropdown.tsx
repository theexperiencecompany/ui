"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Tag01Icon, Cancel01Icon, HugeiconsIcon } from "@/components/icons";

import { cn } from "@/lib/utils";
import { getToolCategoryIcon, formatToolName } from "@/lib/utils/tool-icons";

export interface Tool {
	name: string;
	category: string;
	description?: string;
	icon?: React.ReactNode;
}

export interface SlashCommandMatch {
	tool: Tool;
	score: number;
}

interface SlashCommandDropdownProps {
	matches: SlashCommandMatch[];
	selectedIndex: number;
	onSelect: (tool: SlashCommandMatch) => void;
	onClose: () => void;
	position: { top?: number; bottom?: number; left: number; width?: number };
	isVisible: boolean;
	openedViaButton?: boolean;
	selectedCategory?: string;
	categories?: string[];
	onCategoryChange?: (category: string) => void;
	className?: string;
	style?: React.CSSProperties;
}

export const SlashCommandDropdown: React.FC<SlashCommandDropdownProps> = ({
	matches,
	selectedIndex,
	onSelect,
	onClose,
	position,
	isVisible,
	openedViaButton = false,
	selectedCategory = "all",
	categories = [],
	onCategoryChange,
	className,
	style,
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Focus the dropdown when it becomes visible (only when opened via button)
	useEffect(() => {
		if (isVisible && openedViaButton && dropdownRef.current) {
			requestAnimationFrame(() => {
				dropdownRef.current?.focus();
			});
		}
	}, [isVisible, openedViaButton]);

	// Get unique categories from matches if not provided
	const computedCategories = useMemo(() => {
		if (categories && categories.length > 0) {
			return categories;
		}
		const uniqueCategories = Array.from(
			new Set(matches.map((match) => match.tool.category)),
		);
		return ["all", ...uniqueCategories.sort()];
	}, [matches, categories]);

	// Filter matches based on selected category
	const filteredMatches = useMemo(() => {
		if (selectedCategory === "all") {
			return matches;
		}
		return matches.filter((match) => match.tool.category === selectedCategory);
	}, [matches, selectedCategory]);

	// Scroll to selected item when selectedIndex changes
	useEffect(() => {
		if (selectedIndex >= 0 && selectedIndex < filteredMatches.length) {
			const selectedElement = scrollContainerRef.current?.querySelector(
				`[data-index="${selectedIndex}"]`,
			);
			if (selectedElement) {
				selectedElement.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			}
		}
	}, [selectedIndex, filteredMatches.length]);

	if (!isVisible || matches.length === 0) return null;

	return (
		<div
			ref={dropdownRef}
			className={cn(
				"fixed z-[200] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl shadow-2xl",
				className,
			)}
			style={{
				...(position.top !== undefined && { top: 0, height: position.top }),
				...(position.bottom !== undefined && {
					bottom: `calc(100vh - ${position.bottom - 2}px)`,
					maxHeight: position.bottom,
				}),
				left: position.left,
				width: position.width,
				boxShadow: "0px -18px 30px 5px rgba(0, 0, 0, 0.3)",
				...style,
			}}
			onClick={(e) => e.stopPropagation()}
			tabIndex={-1}
		>
			{/* Header section - Only show when opened via button */}
			{openedViaButton && (
				<div className="flex items-center justify-between p-3 border-b border-zinc-800">
					<div className="text-sm font-medium text-zinc-300">Browse Tools</div>
					<button
						onClick={onClose}
						className="rounded-full p-1 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
						aria-label="Close"
					>
						<HugeiconsIcon icon={Cancel01Icon} size={16} />
					</button>
				</div>
			)}

			{/* Category Tabs */}
			{computedCategories.length > 1 && (
				<div className="border-b border-zinc-800">
					<div className="flex overflow-x-auto px-2 py-2 gap-1 scrollbar-hide">
						{computedCategories.map((category) => (
							<button
								key={category}
								onClick={() => onCategoryChange?.(category)}
								className={cn(
									"flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all",
									selectedCategory === category
										? "bg-zinc-700/40 text-white"
										: "text-zinc-400 hover:bg-white/10 hover:text-zinc-300",
								)}
							>
								{category === "all" ? (
									<HugeiconsIcon
										icon={Tag01Icon}
										size={16}
										className="text-gray-400"
									/>
								) : (
									getToolCategoryIcon(category, {
										showBackground: false,
										width: 16,
										height: 16,
									})
								)}
								<span>
									{category === "all" ? "All" : formatToolName(category)}
								</span>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Tool List */}
			<div
				ref={scrollContainerRef}
				className="max-h-[400px] overflow-y-auto py-2"
			>
				{filteredMatches.length === 0 ? (
					<div className="px-4 py-8 text-center text-sm text-zinc-400">
						No tools found
					</div>
				) : (
					filteredMatches.map((match, index) => {
						const isSelected = index === selectedIndex;
						return (
							<div
								key={`${match.tool.category}-${match.tool.name}`}
								data-index={index}
								className={cn(
									"mx-2 mb-1 cursor-pointer rounded-xl transition-all duration-150",
									isSelected ? "bg-zinc-700/40" : "hover:bg-white/5",
								)}
								onClick={() => onSelect(match)}
							>
								<div className="flex items-center gap-2 p-2">
									{/* Icon */}
									<div className="flex-shrink-0">
										{match.tool.icon ||
											getToolCategoryIcon(match.tool.category, {
												showBackground: false,
											})}
									</div>

									{/* Content */}
									<div className="min-w-0 flex-1">
										<div className="flex items-center justify-between gap-2">
											<span className="truncate text-sm text-zinc-200">
												{formatToolName(match.tool.name)}
											</span>
											{selectedCategory === "all" && (
												<span className="flex-shrink-0 rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
													{formatToolName(match.tool.category)}
												</span>
											)}
										</div>
										{match.tool.description && (
											<div className="text-xs text-zinc-500 mt-0.5">
												{match.tool.description}
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
