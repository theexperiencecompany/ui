"use client";

/**
 * GoalCard - Migrated from GAIA GoalCard
 *
 * Original: apps/web/src/features/goals/components/GoalCard.tsx
 * Displays goal progress with status badges and step tracking
 */

import { cn } from "@/lib/utils";
import {
	Calendar03Icon,
	CheckmarkCircle02Icon,
	ArrowRight01Icon,
	MoreVerticalIcon,
	HugeiconsIcon,
} from "@/components/icons";
import { type FC } from "react";

export type GoalStatus = "not_started" | "in_progress" | "completed";

export interface GoalStep {
	id: string;
	title: string;
	isComplete: boolean;
}

export interface GoalRoadmap {
	title: string;
	nodes: GoalStep[];
}

export interface GoalCardProps {
	id: string;
	title: string;
	progress: number; // 0-100
	createdAt?: string | Date;
	roadmap?: GoalRoadmap;
	onClick?: (id: string) => void;
	onDelete?: (id: string) => void;
	className?: string;
}

const formatDate = (date: string | Date): string => {
	const d = new Date(date);
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

export const GoalCard: FC<GoalCardProps> = ({
	id,
	title,
	progress,
	createdAt,
	roadmap,
	onClick,
	onDelete,
	className,
}) => {
	// Calculate status based on progress and roadmap
	const nodes = roadmap?.nodes || [];
	const totalSteps = nodes.length;
	const completedSteps = nodes.filter((node) => node.isComplete).length;
	const hasSteps = totalSteps > 0;

	const getStatus = (): GoalStatus => {
		if (!hasSteps) return "not_started";
		if (progress === 100) return "completed";
		if (progress > 0) return "in_progress";
		return "not_started";
	};

	const status = getStatus();

	const statusConfig = {
		not_started: {
			label: "Not Started",
			bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
			textColor: "text-amber-600 dark:text-amber-400",
		},
		in_progress: {
			label: "In Progress",
			bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
			textColor: "text-blue-600 dark:text-blue-400",
		},
		completed: {
			label: "Completed",
			bgColor: "bg-green-500/10 dark:bg-green-500/20",
			textColor: "text-green-600 dark:text-green-400",
		},
	};

	const statusInfo = statusConfig[status];
	const displayTitle = roadmap?.title || title;

	return (
		<div
			className={cn(
				"group flex w-full flex-col rounded-3xl p-5",
				"bg-white dark:bg-zinc-900",
				"border border-zinc-200 dark:border-zinc-800",
				"shadow-sm",
				className,
			)}
		>
			{/* Title row */}
			<div className="relative flex w-full items-center gap-2">
				<span className="w-[90%] truncate font-medium text-lg text-zinc-900 dark:text-zinc-100">
					{displayTitle}
				</span>

				{/* Dropdown menu button (shows on hover) */}
				{onDelete && (
					<div className="absolute -right-2 opacity-0 transition-opacity group-hover:opacity-100">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(id);
							}}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
								"hover:bg-zinc-100 dark:hover:bg-zinc-800",
							)}
							aria-label="Delete goal"
						>
							<HugeiconsIcon
								icon={MoreVerticalIcon}
								size={16}
								className="text-zinc-500"
							/>
						</button>
					</div>
				)}
			</div>

			{/* Progress bar */}
			<div className="my-4 flex items-center justify-between gap-3">
				<div className="relative h-2.5 w-full rounded-full overflow-hidden">
					{/* Progress fill */}
					<div
						className="absolute top-0 left-0 z-[2] h-full rounded-full bg-zinc-900 dark:bg-zinc-100 transition-all"
						style={{ width: `${progress || 0}%` }}
					/>
					{/* Background track */}
					<div className="absolute top-0 left-0 h-full w-full bg-zinc-100 dark:bg-zinc-800" />
				</div>
				<span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 min-w-[2.5rem] text-right">
					{progress || 0}%
				</span>
			</div>

			{/* Status and metadata row */}
			<div className="flex flex-wrap cursor-default items-center justify-start gap-2">
				{/* Status chip */}
				<span
					className={cn(
						"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
						statusInfo.bgColor,
						statusInfo.textColor,
					)}
				>
					{statusInfo.label}
				</span>

				{/* Steps chip */}
				{hasSteps && (
					<span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400">
						<HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
						{completedSteps}/{totalSteps} steps
					</span>
				)}

				{/* Created date */}
				{createdAt && (
					<span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500 ml-1">
						<HugeiconsIcon icon={Calendar03Icon} size={14} />
						{formatDate(createdAt)}
					</span>
				)}

				{/* View button */}
				{onClick && (
					<button
						type="button"
						onClick={() => onClick(id)}
						className={cn(
							"ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
							"bg-zinc-900 text-zinc-100 hover:bg-zinc-700",
							"dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
						)}
					>
						View Goal
						<HugeiconsIcon icon={ArrowRight01Icon} size={14} />
					</button>
				)}
			</div>
		</div>
	);
};
