import type { IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import {
	Brain02Icon,
	CheckListIcon,
	AlarmClockIcon,
	ComputerProgramming01Icon,
	File02Icon,
	HugeiconsIcon,
	Image02Icon,
	InformationCircleIcon,
	Link01Icon,
	Notification03Icon,
	PackageOpenIcon,
	SourceCodeCircleIcon,
	SquareArrowUpRight02Icon,
	Target02Icon,
	ToolsIcon,
} from "@/components/icons";

export interface IconProps {
	size?: number;
	width?: number;
	height?: number;
	strokeWidth?: number;
	className?: string;
	color?: string;
}

// Category-specific icons with colors
export interface IconConfig {
	icon: IconSvgElement | string;
	bgColor: string;
	bgColorLight?: string; // Light mode background
	iconColor: string;
	isImage?: boolean;
}

/**
 * Normalize a category/integration name for icon lookup
 */
const normalizeCategoryName = (name: string): string => {
	if (!name) return "general";
	return name
		.toLowerCase()
		.trim()
		.replace(/[\s-]+/g, "_")
		.replace(/_+/g, "_")
		.replace(/^_|_$/g, "");
};

// Alias mapping for backwards compatibility
const iconAliases: Record<string, string> = {
	calendar: "google_calendar",
};

// Tool category icon configs - matches gaia repo pattern
const iconConfigs: Record<string, IconConfig> = {
	// Integration icons (use images)
	gmail: {
		icon: "/images/icons/gmail.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	google_calendar: {
		icon: "/images/icons/googlecalendar.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	github: {
		icon: "/images/icons/github.png",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	linear: {
		icon: "/images/icons/linear.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	slack: {
		icon: "/images/icons/slack.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	google_docs: {
		icon: "/images/icons/google_docs.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	googlesheets: {
		icon: "/images/icons/googlesheets.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	search: {
		icon: "/images/icons/google.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	weather: {
		icon: "/images/icons/weather.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	notion: {
		icon: "/images/icons/notion.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	twitter: {
		icon: "/images/icons/twitter.webp",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	linkedin: {
		icon: "/images/icons/linkedin.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	reddit: {
		icon: "/images/icons/reddit.svg",
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
		isImage: true,
	},
	figma: {
		icon: "/images/icons/figma.svg",
		bgColor: "bg-zinc-800",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-white",
		isImage: true,
	},
	
	// Category icons (use HugeIcons components)
	todos: {
		icon: CheckListIcon,
		bgColor: "bg-emerald-500/20 backdrop-blur",
		bgColorLight: "bg-emerald-500/20",
		iconColor: "text-emerald-400",
	},
	reminders: {
		icon: AlarmClockIcon,
		bgColor: "bg-sky-500/20 backdrop-blur",
		bgColorLight: "bg-sky-500/20",
		iconColor: "text-blue-400",
	},
	documents: {
		icon: File02Icon,
		bgColor: "bg-orange-500/20 backdrop-blur",
		bgColorLight: "bg-orange-500/20",
		iconColor: "text-orange-400",
	},
	development: {
		icon: SourceCodeCircleIcon,
		bgColor: "bg-sky-500/20 backdrop-blur",
		bgColorLight: "bg-sky-500/20",
		iconColor: "text-cyan-400",
	},
	memory: {
		icon: Brain02Icon,
		bgColor: "bg-indigo-500/20 backdrop-blur",
		bgColorLight: "bg-indigo-500/20",
		iconColor: "text-indigo-400",
	},
	creative: {
		icon: Image02Icon,
		bgColor: "bg-pink-500/20 backdrop-blur",
		bgColorLight: "bg-pink-500/20",
		iconColor: "text-pink-400",
	},
	goal_tracking: {
		icon: Target02Icon,
		bgColor: "bg-emerald-500/20 backdrop-blur",
		bgColorLight: "bg-emerald-500/20",
		iconColor: "text-emerald-400",
	},
	notifications: {
		icon: Notification03Icon,
		bgColor: "bg-yellow-500/20 backdrop-blur",
		bgColorLight: "bg-yellow-500/20",
		iconColor: "text-yellow-400",
	},
	support: {
		icon: InformationCircleIcon,
		bgColor: "bg-sky-500/20 backdrop-blur",
		bgColorLight: "bg-sky-500/20",
		iconColor: "text-blue-400",
	},
	general: {
		icon: InformationCircleIcon,
		bgColor: "bg-gray-500/20 backdrop-blur",
		bgColorLight: "bg-gray-500/20",
		iconColor: "text-gray-400",
	},
	integrations: {
		icon: Link01Icon,
		bgColor: "bg-zinc-700",
		bgColorLight: "bg-zinc-200",
		iconColor: "text-zinc-200",
	},
	
	// Agent tool call categories
	handoff: {
		icon: SquareArrowUpRight02Icon,
		bgColor: "bg-sky-500/20 backdrop-blur",
		bgColorLight: "bg-sky-500/20",
		iconColor: "text-sky-400",
	},
	retrieve_tools: {
		icon: PackageOpenIcon,
		bgColor: "bg-indigo-500/20 backdrop-blur",
		bgColorLight: "bg-indigo-500/20",
		iconColor: "text-indigo-400",
	},
	executor: {
		icon: ComputerProgramming01Icon,
		bgColor: "bg-teal-500/20 backdrop-blur",
		bgColorLight: "bg-teal-500/20",
		iconColor: "text-teal-400",
	},
	unknown: {
		icon: ToolsIcon,
		bgColor: "bg-zinc-500/20 backdrop-blur",
		bgColorLight: "bg-zinc-500/20",
		iconColor: "text-zinc-400",
	},
};

/**
 * Get icon for a tool category with optional URL-based icon fallback.
 * Supports built-in categories and custom integration icons via iconUrl.
 */
export const getToolCategoryIcon = (
	category: string,
	iconProps: Partial<IconProps> & { showBackground?: boolean } = {},
	iconUrl?: string | null,
) => {
	const { showBackground = true, ...restProps } = iconProps;

	const defaultProps = {
		size: restProps.size || 16,
		width: restProps.width || 20,
		height: restProps.height || 20,
		strokeWidth: restProps.strokeWidth || 2,
		className: restProps.className,
	};

	// Normalize
	const normalizedCategory = normalizeCategoryName(category);

	// Resolve aliases
	const aliasedCategory =
		iconAliases[normalizedCategory] ||
		iconAliases[category] ||
		normalizedCategory;

	const finalCategory = normalizeCategoryName(aliasedCategory);

	let config = iconConfigs[finalCategory];

	// Fallback search
	if (!config) {
		const normalizedConfigs = Object.entries(iconConfigs);
		const matchingConfig = normalizedConfigs.find(
			([key]) => normalizeCategoryName(key) === finalCategory,
		);
		if (matchingConfig) {
			config = matchingConfig[1];
		}
	}

	// If no predefined config found, try iconUrl fallback for custom integrations
	if (!config) {
		if (iconUrl) {
			const iconElement = (
				<Image
					alt={`${category} Icon`}
					width={defaultProps.width}
					height={defaultProps.height}
					className={`${restProps.className || ""} aspect-square object-contain`}
					src={iconUrl}
				/>
			);
			return showBackground ? (
				<div className="rounded-lg p-1 bg-zinc-700 dark:bg-zinc-700">{iconElement}</div>
			) : (
				iconElement
			);
		}
		return null;
	}

	// Render image or component icon
	const iconElement = config.isImage ? (
		<Image
			alt={`${category} Icon`}
			width={defaultProps.width}
			height={defaultProps.height}
			className={`${restProps.className || ""} aspect-square object-contain`}
			src={config.icon as string}
		/>
	) : (
		<HugeiconsIcon
			icon={config.icon as IconSvgElement}
			size={defaultProps.size}
			className={restProps.className || config.iconColor}
		/>
	);

	// Return with or without background based on showBackground prop
	// Using dark: prefix for proper light/dark mode support
	return showBackground ? (
		<div className={`rounded-lg p-1 ${config.bgColorLight || config.bgColor} dark:${config.bgColor}`}>
			{iconElement}
		</div>
	) : (
		iconElement
	);
};

// Format tool names from snake_case to Title Case
export const formatToolName = (name: string): string => {
	return name
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};
