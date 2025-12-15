import {
	Brain02Icon,
	Calendar03Icon,
	CheckmarkCircle02Icon,
	File02Icon,
	HugeiconsIcon,
	Image02Icon,
	InformationCircleIcon,
	Layout01Icon,
	Link01Icon,
	Mail01Icon,
	MapsIcon,
	MessageMultiple02Icon,
	Notification03Icon,
	Search01Icon,
	SourceCodeCircleIcon,
	Sun03Icon,
	TableIcon,
	Target02Icon,
	Task01Icon,
	VideoReplayIcon,
} from "@/components/icons";
import { IconSvgElement } from "@hugeicons/react";

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
	icon: IconSvgElement;
	bgColor: string;
	iconColor: string;
	isImage?: boolean;
}

// Tool category icon configs - Mapped to HugeIcons equivalents
const iconConfigs: Record<string, IconConfig> = {
	productivity: {
		icon: CheckmarkCircle02Icon,
		bgColor: "bg-emerald-500/20 backdrop-blur",
		iconColor: "text-emerald-400",
	},
	documents: {
		icon: File02Icon,
		bgColor: "bg-orange-500/20 backdrop-blur",
		iconColor: "text-orange-400",
	},
	development: {
		icon: SourceCodeCircleIcon,
		bgColor: "bg-cyan-500/20 backdrop-blur",
		iconColor: "text-cyan-400",
	},
	memory: {
		icon: Brain02Icon,
		bgColor: "bg-indigo-500/20 backdrop-blur",
		iconColor: "text-indigo-400",
	},
	creative: {
		icon: Image02Icon,
		bgColor: "bg-pink-500/20 backdrop-blur",
		iconColor: "text-pink-400",
	},
	goal_tracking: {
		icon: Target02Icon,
		bgColor: "bg-emerald-500/20 backdrop-blur",
		iconColor: "text-emerald-400",
	},
	notifications: {
		icon: Notification03Icon,
		bgColor: "bg-yellow-500/20 backdrop-blur",
		iconColor: "text-yellow-400",
	},
	support: {
		icon: InformationCircleIcon,
		bgColor: "bg-blue-500/20 backdrop-blur",
		iconColor: "text-blue-400",
	},
	general: {
		icon: InformationCircleIcon,
		bgColor: "bg-gray-500/20 backdrop-blur",
		iconColor: "text-gray-400",
	},
	// Integration mappings
	gmail: {
		icon: Mail01Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	google_docs: {
		icon: File02Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	googlesheets: {
		icon: TableIcon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	search: {
		icon: Search01Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	weather: {
		icon: Sun03Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	notion: {
		icon: Layout01Icon, // Using Layout as proxy
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	twitter: {
		icon: MessageMultiple02Icon, // Proxy
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	linkedin: {
		icon: Link01Icon, // Proxy
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	google_calendar: {
		icon: Calendar03Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	github: {
		icon: SourceCodeCircleIcon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	google_maps: {
		icon: MapsIcon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	trello: {
		icon: Task01Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	slack: {
		icon: MessageMultiple02Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	zoom: {
		icon: VideoReplayIcon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
	integrations: {
		icon: Link01Icon,
		bgColor: "bg-zinc-700",
		iconColor: "text-zinc-200",
	},
};

// Map aliases (e.g. calendar -> google_calendar)
const iconAliases: Record<string, string> = {
	calendar: "google_calendar",
};

/**
 * Normalize a category/integration name for icon lookup
 */
const normalizeCategoryName = (name: string): string => {
	return name
		.toLowerCase()
		.trim()
		.replace(/[\s-]+/g, "_")
		.replace(/_+/g, "_")
		.replace(/^_|_$/g, "");
};

export const getToolCategoryIcon = (
	category: string,
	iconProps: Partial<IconProps> & { showBackground?: boolean } = {},
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

	if (!config) return null;

	const IconComponent = config.icon;

	const iconElement = (
		<HugeiconsIcon
			icon={IconComponent}
			size={defaultProps.size}
			className={restProps.className || config.iconColor}
		/>
	);

	// Return with or without background based on showBackground prop
	return showBackground ? (
		<div className={`rounded-lg p-1 ${config.bgColor}`}>{iconElement}</div>
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
