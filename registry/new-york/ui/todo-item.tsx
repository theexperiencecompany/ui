"use client";

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

export const priorityConfig = {
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
		bgColor: "bg-sky-500/10 dark:bg-sky-400/10",
		borderColor: "border-blue-500",
	},
	none: {
		textColor: "text-zinc-500 dark:text-zinc-500",
		bgColor: "bg-zinc-500/10 dark:bg-zinc-500/10",
		borderColor: "border-zinc-400 dark:border-zinc-500",
	},
} as const;
