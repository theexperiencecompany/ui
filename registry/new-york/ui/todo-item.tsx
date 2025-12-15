"use client";

import { type FC } from "react";
import { cn } from "@/lib/utils";
import {
	Calendar03Icon,
	Tick02Icon,
	Flag02Icon,
	Folder02Icon,
	Tag01Icon,
	HugeiconsIcon,
} from "@/components/icons";

export type TodoPriority = "high" | "medium" | "low" | "none";

export interface TodoLabel {
	id: string;
	name: string;
	color?: string;
}

export interface TodoSubtask {
	id: string;
	title: string;
	completed: boolean;
}

export interface TodoProject {
	id: string;
	name: string;
	color?: string;
}

export interface TodoItemProps {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: TodoPriority;
	dueDate?: string | Date;
	labels?: TodoLabel[];
	subtasks?: TodoSubtask[];
	project?: TodoProject;
	onToggleComplete?: (id: string, completed: boolean) => void;
	onClick?: (id: string) => void;
	isSelected?: boolean;
	className?: string;
}

const priorityConfig = {
	high: {
		textColor: "text-red-500 dark:text-red-400",
		bgColor: "bg-red-500/10 dark:bg-red-400/10",
		borderColor: "border-red-500",
	},
	medium: {
		textColor: "text-yellow-600 dark:text-yellow-400",
		bgColor: "bg-yellow-500/10 dark:bg-yellow-400/10",
		borderColor: "border-yellow-500",
	},
	low: {
		textColor: "text-blue-500 dark:text-blue-400",
		bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
		borderColor: "border-blue-500",
	},
	none: {
		textColor: "text-zinc-500 dark:text-zinc-500",
		bgColor: "bg-zinc-500/10 dark:bg-zinc-500/10",
		borderColor: "border-zinc-400 dark:border-zinc-500",
	},
} as const;

export const TodoItem: FC<TodoItemProps> = ({
	id,
	title,
	description,
	completed,
	priority,
	dueDate,
	labels = [],
	subtasks = [],
	project,
	onToggleComplete,
	onClick,
	isSelected = false,
	className,
}) => {
	const priorityStyle = priorityConfig[priority];

	const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed;
	const isToday =
		dueDate &&
		!completed &&
		(() => {
			const d = new Date(dueDate);
			const now = new Date();
			return (
				d.getFullYear() === now.getFullYear() &&
				d.getMonth() === now.getMonth() &&
				d.getDate() === now.getDate()
			);
		})();

	const formatDate = (date: string | Date) => {
		const d = new Date(date);
		const now = new Date();
		const diff = d.getTime() - now.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (days === 0) return "Today";
		if (days === 1) return "Tomorrow";
		if (days === -1) return "Yesterday";
		if (days < 0) return `${Math.abs(days)} days ago`;
		if (days < 7) return `In ${days} days`;

		return d.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const completedSubtasks = subtasks.filter((s) => s.completed).length;

	return (
		<button
			type="button"
			className={cn(
				"group pointer-events-auto w-full text-left p-4 pl-5 mb-0 transition-all rounded-lg",
				isSelected
					? "bg-blue-500/5 ring-2 ring-blue-500"
					: "hover:bg-zinc-100 dark:hover:bg-zinc-800/70",
				completed && "opacity-50",
				className,
			)}
			onClick={() => onClick?.(id)}
		>
			<div className="flex items-start gap-3">
				{/* Checkbox */}
				<div
					onClick={(e) => {
						e.stopPropagation();
						onToggleComplete?.(id, !completed);
					}}
					className={cn(
						"mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all flex-shrink-0",
						completed
							? "border-zinc-400 bg-zinc-400 dark:border-zinc-500 dark:bg-zinc-500"
							: `${priorityStyle.borderColor} border-dashed bg-transparent`,
					)}
					aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
				>
					{completed && (
						<HugeiconsIcon icon={Tick02Icon} size={12} className="text-white" />
					)}
				</div>

				{/* Content */}
				<div className="min-w-0 flex-1">
					<div>
						<h4
							className={cn(
								"text-base font-medium text-zinc-900 dark:text-zinc-100",
								completed && "text-zinc-500 dark:text-zinc-500 line-through",
							)}
						>
							{title}
						</h4>
						{description && (
							<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
								{description}
							</p>
						)}
					</div>

					{/* Metadata */}
					{(priority !== "none" ||
						dueDate ||
						labels.length > 0 ||
						project ||
						subtasks.length > 0) && (
						<div className="mt-2 flex flex-wrap items-center gap-1">
							{/* Due Date */}
							{dueDate && (
								<span
									className={cn(
										"inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs",
										isToday
											? "bg-green-500/10 text-green-600 dark:text-green-400"
											: isOverdue
												? "bg-red-500/10 text-red-600 dark:text-red-400"
												: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
									)}
								>
									<HugeiconsIcon icon={Calendar03Icon} size={12} />
									{formatDate(dueDate)}
								</span>
							)}

							{/* Project */}
							{project && (
								<span
									className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
									style={{ color: project.color }}
								>
									<HugeiconsIcon icon={Folder02Icon} size={12} />
									{project.name}
								</span>
							)}

							{/* Labels */}
							{labels.map((label) => (
								<span
									key={label.id}
									className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
									style={label.color ? { color: label.color } : undefined}
								>
									<HugeiconsIcon icon={Tag01Icon} size={12} />
									{label.name}
								</span>
							))}

							{/* Priority */}
							{priority !== "none" && (
								<span
									className={cn(
										"inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs",
										priorityStyle.bgColor,
										priorityStyle.textColor,
									)}
								>
									<HugeiconsIcon icon={Flag02Icon} size={12} />
									{priority.charAt(0).toUpperCase() + priority.slice(1)}
								</span>
							)}

							{/* Subtasks */}
							{subtasks.length > 0 && (
								<span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400">
									<HugeiconsIcon icon={Tick02Icon} size={12} />
									{completedSubtasks}/{subtasks.length} subtasks
								</span>
							)}
						</div>
					)}
				</div>

				{/* Chevron */}
				<div
					className="flex h-full items-center self-center text-zinc-400 dark:text-zinc-600"
					aria-hidden="true"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Navigate</title>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</div>
			</div>
		</button>
	);
};
