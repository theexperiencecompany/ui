"use client";

import {
	NestedMenu,
	type NestedMenuSectionProps,
} from "@/registry/new-york/ui/nested-menu";
import { Button } from "@/components/ui/button";
import {
	HugeiconsIcon,
	Settings01Icon,
	BookOpen02Icon,
	CloudDownloadIcon,
	CustomerService01Icon,
	ArrowRight01Icon,
	MapsIcon,
	QuillWrite01Icon,
	BubbleChatQuestionIcon,
	GitPullRequestIcon,
} from "@/components/icons";

// Icon wrapper component for consistent styling
const Icon = ({
	icon,
	className,
}: {
	icon: typeof Settings01Icon;
	className?: string;
}) => <HugeiconsIcon icon={icon} className={className} size={16} />;

const menuSections: NestedMenuSectionProps[] = [
	{
		title: "Resources",
		items: [
			{
				key: "documentation",
				label: "Documentation",
				icon: (props) => <Icon icon={BookOpen02Icon} {...props} />,
				onSelect: () => console.log("Documentation clicked"),
			},
			{
				key: "roadmap",
				label: "Roadmap",
				icon: (props) => <Icon icon={MapsIcon} {...props} />,
				onSelect: () => console.log("Roadmap clicked"),
			},
			{
				key: "blog",
				label: "Blog",
				icon: (props) => <Icon icon={QuillWrite01Icon} {...props} />,
				onSelect: () => console.log("Blog clicked"),
			},
		],
		showDivider: true,
	},
	{
		items: [
			{
				key: "download",
				label: "Download",
				icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
				hasSubmenu: true,
				submenuItems: [
					{
						key: "mac",
						label: "macOS",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download macOS"),
					},
					{
						key: "windows",
						label: "Windows",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download Windows"),
					},
					{
						key: "linux",
						label: "Linux",
						icon: (props) => <Icon icon={CloudDownloadIcon} {...props} />,
						onSelect: () => console.log("Download Linux"),
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
						key: "contact",
						label: "Contact Support",
						icon: (props) => <Icon icon={BubbleChatQuestionIcon} {...props} />,
						onSelect: () => console.log("Contact Support"),
					},
					{
						key: "feature",
						label: "Request a Feature",
						icon: (props) => <Icon icon={GitPullRequestIcon} {...props} />,
						onSelect: () => console.log("Request Feature"),
					},
				],
			},
		],
	},
];

export default function NestedMenuDefault() {
	return (
		<div className="flex justify-center py-8">
			<NestedMenu
				sections={menuSections}
				trigger={
					<Button variant="outline" className="gap-2">
						<HugeiconsIcon icon={Settings01Icon} size={16} />
						Open Menu
					</Button>
				}
				arrowIcon={(props) => <Icon icon={ArrowRight01Icon} {...props} />}
				side="bottom"
				align="start"
			/>
		</div>
	);
}
