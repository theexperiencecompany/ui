"use client";

import {
	Download05Icon,
	Home09Icon,
	HugeiconsIcon,
	ImageCompositionIcon,
	MapsIcon,
	ShapeCollectionIcon,
	StatusIcon,
	UserLove01Icon
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { ComponentPreviewTooltip } from "@/registry/new-york/ui/component-preview-tooltip";
import type { NavSection } from "@/types/nav-item";
import type { IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { DiscordIcon, TwitterIcon } from "../icons/social-icons";

interface DocsSidebarClientProps {
	navigation: NavSection[];
}

// Map page titles to icons
const pageIcons: Record<string, IconSvgElement> = {
	Introduction: Home09Icon,
	Components: ShapeCollectionIcon,
	Installation: Download05Icon,
	"Status - Beta": StatusIcon,
	Roadmap: MapsIcon,
	Contributors: UserLove01Icon,
	Gallery: ImageCompositionIcon,
};

const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	Twitter: TwitterIcon,
	Discord: DiscordIcon,
};

export function DocsSidebarClient({ navigation }: DocsSidebarClientProps) {
	const pathname = usePathname();

	// Extract component name from href (e.g., "/docs/components/todo-item" -> "todo-item")
	const getComponentName = (href: string): string | null => {
		const match = href.match(/\/docs\/components\/([^/]+)$/);
		return match ? match[1] : null;
	};

	return (
		<aside className="sticky top-14 hidden md:block w-full md:w-[220px] lg:w-[240px] shrink-0 h-[calc(100vh-3.5rem)]">
			<div className="py-10  lg:py-8 overflow-auto h-full">
				<nav className="grid grid-flow-row auto-rows-max text-sm">
					{navigation.map((section) => (
						<div key={section.title} className="pb-6">
							{section.title.length > 0 && section.title !== "Socials" && (
								<h4 className="rounded-md px-2 py-1 text-xs text-muted-foreground">
									{section.title}
								</h4>
							)}
							{section.items && (
								<div className="grid grid-flow-row auto-rows-max gap-1">
									{section.items.map((item) => {
										const componentName = getComponentName(item.href);
										const isComponentPage = item.href.includes("/components/");
										const isExternalLink = item.href.startsWith("http");
										const PageIcon = pageIcons[item.title];
										const SocialIcon = socialIcons[item.title];

										// Brand colors for social icons
										const iconColor =
											item.title === "Discord"
												? "text-[#5865F2]"
												: item.title === "Twitter"
													? "text-[#1DA1F2]"
													: "text-foreground/50";

										const linkContent = (
											<>
												{item.icon ? (
													<Image
														src={item.icon}
														alt=""
														className="w-4 h-4"
														width={16}
														height={16}
													/>
												) : PageIcon ? (
													<HugeiconsIcon
														icon={PageIcon}
														size={17}
														className={cn(iconColor)}
													/>
												) : SocialIcon ? (
													<SocialIcon className={cn("w-4 h-4", iconColor)} />
												) : null}

												{item.title}
											</>
										);

										const linkElement = isExternalLink ? (
											<a
												href={item.href}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex w-fit items-center gap-1.5 text-sm rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground font-medium text-foreground"
											>
												{linkContent}
											</a>
										) : (
											<Link
												href={item.href}
												className={cn(
													"group flex w-fit items-center gap-1.5 text-sm rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground font-medium text-foreground",
													pathname === item.href ? "bg-accent" : "",
												)}
											>
												{linkContent}
											</Link>
										);

										// Wrap component links with preview tooltip
										if (isComponentPage && componentName) {
											return (
												<ComponentPreviewTooltip
													key={item.href}
													componentName={componentName}
													side="right"
													height={200}
												>
													{linkElement}
												</ComponentPreviewTooltip>
											);
										}

										return <div key={item.href}>{linkElement}</div>;
									})}
								</div>
							)}
						</div>
					))}
				</nav>
			</div>
		</aside>
	);
}
