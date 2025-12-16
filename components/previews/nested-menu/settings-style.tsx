"use client";

import { useState } from "react";
import {
	NestedMenu,
	type NestedMenuSectionProps,
} from "@/registry/new-york/ui/nested-menu";
import {
	HugeiconsIcon,
	Settings01Icon,
	ArrowRight01Icon,
	UserCircleIcon,
	SparklesIcon,
	ChartLineData02Icon,
	AiBrain01Icon,
	CloudDownloadIcon,
	BookOpen02Icon,
	CustomerService01Icon,
	Logout02Icon,
	CircleArrowUp02Icon,
	BookBookmark02Icon,
	Layers01Icon,
	MapsIcon,
	QuillWrite01Icon,
	BubbleChatQuestionIcon,
	GitPullRequestIcon,
} from "@/components/icons";
import {
	Github,
	DiscordIcon,
	TwitterIcon,
} from "@/components/icons/social-icons";

// Icon wrapper component for consistent styling
const Icon = ({
	icon,
	className,
}: {
	icon: typeof Settings01Icon;
	className?: string;
}) => <HugeiconsIcon icon={icon} className={className} size={16} />;

const socialMediaColorMap: Record<string, string> = {
	twitter: "#1da1f2",
	discord: "#5865F2",
};

const menuSections: NestedMenuSectionProps[] = [
	{
		items: [
			{
				key: "upgrade_to_pro",
				label: "Upgrade to Pro",
				icon: (props) => <Icon icon={CircleArrowUp02Icon} {...props} />,
				iconColor: "#00bbff",
				onSelect: () => console.log("Upgrade clicked"),
				className: "text-blue-500 font-medium",
			},
		],
		showDivider: true,
	},
	{
		title: "Settings",
		items: [
			{
				key: "profile",
				label: "Profile Card",
				icon: (props) => <Icon icon={SparklesIcon} {...props} />,
				onSelect: () => console.log("Profile clicked"),
			},
			{
				key: "account",
				label: "Account",
				icon: (props) => <Icon icon={UserCircleIcon} {...props} />,
				onSelect: () => console.log("Account clicked"),
			},
			{
				key: "usage",
				label: "Usage",
				icon: (props) => <Icon icon={ChartLineData02Icon} {...props} />,
				onSelect: () => console.log("Usage clicked"),
			},
			{
				key: "memory",
				label: "Memories",
				icon: (props) => <Icon icon={AiBrain01Icon} {...props} />,
				onSelect: () => console.log("Memory clicked"),
			},
		],
		showDivider: true,
	},
	{
		title: "Community",
		items: [
			{
				key: "twitter",
				label: "Follow Us",
				icon: (props) => <TwitterIcon {...props} width={16} height={16} />,
				iconColor: socialMediaColorMap.twitter,
				onSelect: () => window.open("https://twitter.com", "_blank"),
			},
			{
				key: "discord",
				label: "Join Discord",
				icon: (props) => <DiscordIcon {...props} width={16} height={16} />,
				iconColor: socialMediaColorMap.discord,
				onSelect: () => window.open("https://discord.com", "_blank"),
			},
		],
		showDivider: true,
	},
	{
		items: [
			{
				key: "download",
				label: "Download for macOS",
				icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
				hasSubmenu: true,
				submenuItems: [
					{
						key: "mac-arm",
						label: "macOS (Apple Silicon)",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download macOS ARM"),
					},
					{
						key: "mac-intel",
						label: "macOS (Intel)",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download macOS Intel"),
					},
					{
						key: "windows",
						label: "Windows",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download Windows"),
					},
				],
			},
			{
				key: "resources",
				label: "Resources",
				icon: (props) => <Icon icon={BookOpen02Icon} {...props} />,
				hasSubmenu: true,
				submenuItems: [
					{
						key: "documentation",
						label: "Documentation",
						icon: (props) => <Icon icon={BookBookmark02Icon} {...props} />,
						onSelect: () => console.log("Documentation"),
					},
					{
						key: "changelog",
						label: "Changelog",
						icon: (props) => <Icon icon={Layers01Icon} {...props} />,
						onSelect: () => console.log("Changelog"),
					},
					{
						key: "blog",
						label: "Blog",
						icon: (props) => <Icon icon={QuillWrite01Icon} {...props} />,
						onSelect: () => console.log("Blog"),
					},
					{
						key: "roadmap",
						label: "Roadmap",
						icon: (props) => <Icon icon={MapsIcon} {...props} />,
						onSelect: () => console.log("Roadmap"),
					},
					{
						key: "opensource",
						label: "Open Source",
						icon: (props) => <Github {...props} width={16} height={16} />,
						onSelect: () => console.log("Open Source"),
					},
				],
			},
			{
				key: "support",
				label: "Support",
				icon: (props) => <Icon icon={CustomerService01Icon} {...props} />,
				hasSubmenu: true,
				submenuItems: [
					{
						key: "contact_support",
						label: "Contact Support",
						icon: (props) => <Icon icon={BubbleChatQuestionIcon} {...props} />,
						onSelect: () => console.log("Contact Support"),
					},
					{
						key: "feature_request",
						label: "Request a Feature",
						icon: (props) => <Icon icon={GitPullRequestIcon} {...props} />,
						onSelect: () => console.log("Feature Request"),
					},
				],
			},
			{
				key: "settings",
				label: "Settings",
				icon: (props) => <Icon icon={Settings01Icon} {...props} />,
				onSelect: () => console.log("Settings clicked"),
			},
			{
				key: "logout",
				label: "Sign Out",
				icon: (props) => <Icon icon={Logout02Icon} {...props} />,
				variant: "danger",
				onSelect: () => console.log("Logout clicked"),
			},
		],
	},
];

export default function NestedMenuSettings() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex justify-center py-8">
			<NestedMenu
				sections={menuSections}
				trigger={
					<button
						type="button"
						className="flex items-center gap-2 rounded-full bg-zinc-800 p-2 text-white transition hover:bg-zinc-700"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-medium text-white">
							A
						</div>
					</button>
				}
				arrowIcon={(props) => <Icon icon={ArrowRight01Icon} {...props} />}
				side="right"
				align="start"
				sideOffset={16}
				open={open}
				onOpenChange={setOpen}
			/>
		</div>
	);
}
