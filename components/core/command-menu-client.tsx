"use client";

import {
	Download05Icon,
	GitPullRequestIcon,
	Home09Icon,
	HugeiconsIcon,
	MapsIcon,
	NoteIcon,
	PackageOpenIcon,
	ShapeCollectionIcon,
	StatusIcon,
	UserLove01Icon,
} from "@/components/icons";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import type { NavSection } from "@/types/nav-item";
import type { IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { DiscordIcon, TwitterIcon } from "../icons/social-icons";

// Map page titles to icons (same as sidebar)
const pageIcons: Record<string, IconSvgElement> = {
	Introduction: Home09Icon,
	Components: ShapeCollectionIcon,
	Installation: Download05Icon,
	"Status - Beta": StatusIcon,
	Roadmap: MapsIcon,
	Contributors: UserLove01Icon,
};

const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	Twitter: TwitterIcon,
	Discord: DiscordIcon,
};

interface CommandMenuClientProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	navigation: NavSection[];
}

export function CommandMenuClient({
	open,
	setOpen,
	navigation,
}: CommandMenuClientProps) {
	const router = useRouter();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(!open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [open, setOpen]);

	const runCommand = React.useCallback(
		(command: () => void) => {
			setOpen(false);
			command();
		},
		[setOpen],
	);

	// Render icon for an item
	const renderIcon = (item: { title: string; icon?: string }) => {
		// Check for custom icon (URL)
		if (item.icon) {
			return (
				<Image
					src={item.icon}
					alt={item.title}
					width={16}
					height={16}
					className="mr-2"
				/>
			);
		}

		// Check for social icons
		const SocialIcon = socialIcons[item.title];
		if (SocialIcon) {
			return <SocialIcon className="mr-2 h-4 w-4" />;
		}

		// Check for page icons
		const pageIcon = pageIcons[item.title];
		if (pageIcon)
			return <HugeiconsIcon icon={pageIcon} size={16} className="mr-2" />;

		// Default: component icon
		return <HugeiconsIcon icon={PackageOpenIcon} size={16} className="mr-2" />;
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					<CommandItem onSelect={() => runCommand(() => router.push("/"))}>
						<HugeiconsIcon icon={Home09Icon} size={16} className="mr-2" />
						<span>Home</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
						<HugeiconsIcon icon={NoteIcon} size={16} className="mr-2" />
						<span>Documentation</span>
					</CommandItem>
					<CommandItem
						onSelect={() => runCommand(() => router.push("/docs/installation"))}
					>
						<HugeiconsIcon icon={Download05Icon} size={16} className="mr-2" />
						<span>Installation</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Actions">
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open(
									"https://github.com/heygaia/ui/issues/new?template=component_request.yml",
									"_blank",
								),
							)
						}
					>
						<HugeiconsIcon
							icon={GitPullRequestIcon}
							size={16}
							className="mr-2"
						/>
						<span>Request a Component</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				{navigation?.map((section) => (
					<React.Fragment key={section.title || "getting-started"}>
						<CommandGroup heading={section.title || "Getting Started"}>
							{section.items?.map((item) => (
								<CommandItem
									key={item.href}
									onSelect={() =>
										runCommand(() => {
											if (item.href.startsWith("http"))
												window.open(item.href, "_blank");
											else router.push(item.href);
										})
									}
								>
									{renderIcon(item)}
									<span>{item.title}</span>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</React.Fragment>
				))}
			</CommandList>
		</CommandDialog>
	);
}
