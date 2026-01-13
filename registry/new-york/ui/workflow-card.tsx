"use client";

import Image from "next/image";
import type { FC } from "react";
import {
	FlashIcon,
	HugeiconsIcon,
	Loading03Icon,
	PlayIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

// Tool category icons with colors
export interface ToolCategoryConfig {
	icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
	imageUrl?: string;
	bgColor: string;
	iconColor: string;
}

// Default configuration
const defaultToolCategoryConfig: Record<string, ToolCategoryConfig> = {
	productivity: {
		bgColor: "bg-emerald-500/20",
		iconColor: "text-emerald-600 dark:text-emerald-400",
	},
	documents: {
		bgColor: "bg-orange-500/20",
		iconColor: "text-orange-600 dark:text-orange-400",
	},
	development: {
		bgColor: "bg-sky-500/20",
		iconColor: "text-cyan-600 dark:text-cyan-400",
	},
	memory: {
		bgColor: "bg-indigo-500/20",
		iconColor: "text-indigo-600 dark:text-indigo-400",
	},
	creative: {
		bgColor: "bg-pink-500/20",
		iconColor: "text-pink-600 dark:text-pink-400",
	},
	goal_tracking: {
		bgColor: "bg-emerald-500/20",
		iconColor: "text-emerald-600 dark:text-emerald-400",
	},
	notifications: {
		bgColor: "bg-yellow-500/20",
		iconColor: "text-yellow-600 dark:text-yellow-400",
	},
	email: {
		bgColor: "bg-sky-500/20",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	calendar: {
		bgColor: "bg-purple-500/20",
		iconColor: "text-purple-600 dark:text-purple-400",
	},
	search: {
		bgColor: "bg-teal-500/20",
		iconColor: "text-teal-600 dark:text-teal-400",
	},
	general: {
		bgColor: "bg-gray-500/20",
		iconColor: "text-gray-600 dark:text-gray-400",
	},
};

export interface WorkflowStep {
	id: string;
	title: string;
	description?: string;
	toolCategory: string;
}

export interface WorkflowCardProps {
	title: string;
	description?: string;
	steps: WorkflowStep[];
	totalExecutions?: number;
	isActivated?: boolean;
	triggerLabel?: string;
	variant?: "user" | "explore" | "suggestion";
	actionLabel?: string;
	isLoading?: boolean;
	onAction?: () => void;
	onClick?: () => void;
	showDescriptionAsTooltip?: boolean;
	className?: string;
	categoryConfig?: Record<string, ToolCategoryConfig>;
}

const formatRunCount = (count: number): string => {
	if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M runs`;
	if (count >= 1000) return `${(count / 1000).toFixed(1)}K runs`;
	return `${count} runs`;
};

// Simple category icon component
const CategoryIcon: FC<{
	category: string;
	className?: string;
	config?: Record<string, ToolCategoryConfig>;
}> = ({ category, className, config = defaultToolCategoryConfig }) => {
	const categoryConfig =
		config[category] || config.general || defaultToolCategoryConfig.general;

	return (
		<div className={cn("rounded-lg p-1.5", categoryConfig.bgColor, className)}>
			<div
				className={cn(
					"h-5 w-5 rounded overflow-hidden flex items-center justify-center",
					categoryConfig.iconColor,
				)}
			>
				{categoryConfig.imageUrl ? (
					<Image
						src={categoryConfig.imageUrl}
						alt={category}
						width={20}
						height={20}
						className="h-full w-full object-cover"
					/>
				) : categoryConfig.icon ? (
					typeof categoryConfig.icon === "function" ? (
						<categoryConfig.icon className="h-full w-full" />
					) : (
						categoryConfig.icon
					)
				) : (
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className="h-full w-full"
					>
						<title>{category}</title>
						<circle cx="12" cy="12" r="3" />
						<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
					</svg>
				)}
			</div>
		</div>
	);
};

export const WorkflowCard: FC<WorkflowCardProps> = ({
	title,
	description,
	steps,
	totalExecutions = 0,
	isActivated = false,
	triggerLabel,
	variant = "explore",
	actionLabel,
	isLoading = false,
	onAction,
	onClick,
	showDescriptionAsTooltip = false,
	className,
	categoryConfig,
}) => {
	const categories = [...new Set(steps.map((step) => step.toolCategory))];
	const displayIcons = categories.slice(0, 3);

	const buttonLabel = actionLabel || (variant === "user" ? "Run" : "Create");
	const buttonVariant = variant === "user" ? "flat" : "solid";

	return (
		<button
			type="button"
			className={cn(
				"group relative z-[1] flex h-full min-h-fit w-full flex-col gap-2 rounded-3xl outline-1 p-4 transition-all select-none",
				"bg-zinc-100 outline-zinc-200 dark:bg-zinc-800 dark:outline-zinc-800/70",
				onClick &&
					"cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50",
				className,
			)}
			onClick={onClick}
			onKeyDown={(e) => {
				if (onClick && (e.key === "Enter" || e.key === " ")) {
					e.preventDefault();
					onClick();
				}
			}}
			role={onClick ? "button" : undefined}
			tabIndex={onClick ? 0 : undefined}
		>
			{/* Tool icons with rotation effect */}
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-2">
					<div className="flex min-h-8 items-center -space-x-1.5">
						{displayIcons.map((category, index) => (
							<div
								key={category}
								className="relative flex min-w-8 items-center justify-center"
								style={{
									transform:
										displayIcons.length > 1
											? index % 2 === 0
												? "rotate(8deg)"
												: "rotate(-8deg)"
											: "none",
									zIndex: index,
								}}
							>
								<CategoryIcon category={category} config={categoryConfig} />
							</div>
						))}
						{categories.length > 3 && (
							<div className="z-[0] flex size-[34px] min-h-[34px] min-w-[34px] items-center justify-center rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-sm text-zinc-600 dark:text-zinc-500">
								+{categories.length - 3}
							</div>
						)}
					</div>
				</div>

				{/* Activation status */}
				{variant === "user" && (
					<span
						className={cn(
							"rounded-full px-2 py-0.5 text-xs",
							isActivated
								? "bg-green-500/20 text-green-700 dark:text-green-400"
								: "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-500",
						)}
					>
						{isActivated ? "Active" : "Inactive"}
					</span>
				)}
			</div>

			{/* Title and description */}
			<div>
				<h3 className="line-clamp-2 text-start text-lg font-medium text-zinc-900 dark:text-white">
					{title}
				</h3>
				{!showDescriptionAsTooltip && description && (
					<div className="mt-1 line-clamp-2 text-start min-h-8 flex-1 text-xs text-zinc-500 dark:text-zinc-500">
						{description}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="mt-auto">
				<div className="mt-1 flex items-center justify-between gap-2">
					<div className="space-y-1">
						{/* Trigger label */}
						{triggerLabel && (
							<div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500">
								<HugeiconsIcon
									icon={FlashIcon}
									size={12}
									className="text-zinc-500"
								/>
								<span>{triggerLabel}</span>
							</div>
						)}

						{/* Execution count */}
						{totalExecutions > 0 && (
							<div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500">
								<HugeiconsIcon
									icon={PlayIcon}
									size={12}
									className="text-zinc-500"
								/>
								<span className="text-nowrap">
									{formatRunCount(totalExecutions)}
								</span>
							</div>
						)}
					</div>

					{/* Action button */}
					{onAction && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onAction();
							}}
							disabled={isLoading}
							className={cn(
								"flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
								buttonVariant === "solid"
									? "bg-sky-500 text-white hover:bg-sky-600"
									: "bg-sky-500/10 text-blue-600 hover:bg-sky-500/20 dark:text-blue-400 dark:hover:bg-sky-500/20",
								isLoading && "opacity-50 cursor-not-allowed",
							)}
						>
							{isLoading ? (
								<HugeiconsIcon
									icon={Loading03Icon}
									size={16}
									className="animate-spin"
								/>
							) : (
								<>
									{buttonLabel}
									<HugeiconsIcon icon={FlashIcon} size={16} />
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</button>
	);
};
