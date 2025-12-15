"use client";

import type { FC, ReactNode } from "react";
import { Tick02Icon, Loading03Icon, HugeiconsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type EventStatus = "idle" | "loading" | "completed";
export type EventVariant = "display" | "action";

export interface CalendarEventCardProps {
	eventColor: string;
	status?: EventStatus;
	label?: string;
	children: ReactNode;
	variant?: EventVariant;
	buttonColor?: "primary" | "danger";
	completedLabel?: string;
	onAction?: () => void;
	isDotted?: boolean;
	opacity?: number;
	className?: string;
}

export const CalendarEventCard: FC<CalendarEventCardProps> = ({
	eventColor,
	status = "idle",
	label,
	children,
	variant = "display",
	buttonColor = "primary",
	completedLabel = "Completed",
	onAction,
	isDotted = false,
	opacity = 1,
	className,
}) => {
	const hasAction = variant === "action" && onAction;
	const finalOpacity = status === "completed" ? 0.5 : opacity;

	const buttonColorClasses = {
		primary: "bg-blue-500 hover:bg-blue-600 text-white",
		danger: "bg-red-500 hover:bg-red-600 text-white",
	};

	return (
		<div
			className={cn(
				"relative flex gap-2 rounded-lg p-3 pr-2 pl-5 transition-colors",
				hasAction ? "items-end" : "items-start",
				isDotted && "border-2 border-dashed",
				className,
			)}
			style={{
				...(isDotted
					? {
							borderColor: `${eventColor}80`,
							backgroundColor: `${eventColor}10`,
						}
					: {
							backgroundColor: `${eventColor}20`,
						}),
				opacity: finalOpacity,
			}}
		>
			{/* Color indicator bar */}
			<div className="absolute top-0 left-1 flex h-full items-center">
				<div
					className="h-[80%] w-1 flex-shrink-0 rounded-full"
					style={{
						backgroundColor: eventColor,
					}}
				/>
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				{label && (
					<div
						className={cn(
							"mb-1 text-xs font-medium",
							isDotted
								? "text-blue-600 dark:text-blue-400"
								: "text-zinc-600 dark:text-zinc-500",
						)}
					>
						{label}
					</div>
				)}
				{children}
			</div>

			{/* Action button */}
			{hasAction && (
				<button
					type="button"
					className={cn(
						"flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
						buttonColorClasses[buttonColor],
					)}
					disabled={status === "completed"}
					onClick={onAction}
				>
					{status === "loading" ? (
						<>
							<HugeiconsIcon
								icon={Loading03Icon}
								size={16}
								className="animate-spin"
							/>
							Confirm
						</>
					) : status === "completed" ? (
						<>
							<HugeiconsIcon icon={Tick02Icon} size={16} />
							{completedLabel}
						</>
					) : (
						"Confirm"
					)}
				</button>
			)}
		</div>
	);
};

// Event content components for convenience
export interface EventTitleProps {
	children: ReactNode;
	className?: string;
}

export const EventTitle: FC<EventTitleProps> = ({ children, className }) => (
	<h3 className={cn("font-medium text-zinc-900 dark:text-zinc-100", className)}>
		{children}
	</h3>
);

export interface EventTimeProps {
	startTime: string;
	endTime?: string;
	className?: string;
}

export const EventTime: FC<EventTimeProps> = ({
	startTime,
	endTime,
	className,
}) => (
	<p className={cn("text-sm text-zinc-600 dark:text-zinc-400", className)}>
		{startTime}
		{endTime && ` - ${endTime}`}
	</p>
);

export interface EventLocationProps {
	children: ReactNode;
	className?: string;
}

export const EventLocation: FC<EventLocationProps> = ({
	children,
	className,
}) => (
	<p className={cn("text-xs text-zinc-500 dark:text-zinc-500", className)}>
		{children}
	</p>
);
