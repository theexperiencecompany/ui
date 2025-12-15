"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { CommandMenu } from "@/components/core/command-menu";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/types/nav-item";
import { StarIcon, HugeiconsIcon } from "@/components/icons";
import Image from "next/image";
import { GitHub } from "@/components/icons/github";
import { Kbd, KbdGroup } from "./kbd";

interface NavbarProps {
	navigation: NavSection[];
}

export function Navbar({ navigation }: NavbarProps) {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);
	const [stars, setStars] = React.useState<number | null>(null);

	React.useEffect(() => {
		const fetchStars = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/repos/theexperiencecompany/ui",
				);
				if (response.ok) {
					const data = await response.json();
					setStars(data.stargazers_count);
				}
			} catch (error) {
				console.error("Failed to fetch GitHub stars:", error);
			}
		};

		fetchStars();
	}, []);

	return (
		<header className="sticky top-0 z-50 w-full bg-background">
			<div className="container flex py-3  max-w-screen-2xl items-center px-6">
				<div className="mr-4 flex">
					<Link
						href="/"
						className="mr-6 flex items-center space-x-2 hover:bg-muted-foreground/20 px-2 rounded-sm"
					>
						<Image
							src={"/media/logo_black.webp"}
							alt="Logo"
							width={120}
							height={50}
							className="aspect-auto dark:hidden"
						/>
						<Image
							src={"/media/logo.webp"}
							alt="Logo"
							width={120}
							height={50}
							className="aspect-auto hidden dark:block"
						/>
					</Link>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/docs"
										className={cn(
											navigationMenuTriggerStyle(),
											pathname?.startsWith("/docs")
												? "text-foreground"
												: "text-foreground/60",
										)}
									>
										Documentation
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/docs/components"
										className={cn(
											navigationMenuTriggerStyle(),
											pathname?.startsWith("/docs/components")
												? "text-foreground"
												: "text-foreground/60",
										)}
									>
										Components
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href={siteConfig.links["feature-request"]}
										className={cn(
											navigationMenuTriggerStyle(),
											"text-foreground/60",
										)}
									>
										New Component Request
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<Button
							variant="secondary"
							onClick={() => setOpen(true)}
							className="py-0! h-9 text-sm"
						>
							<span className="hidden lg:inline-flex">
								Search documentation...
							</span>
							<span className="inline-flex lg:hidden">Search...</span>
							<KbdGroup>
								<Kbd className="outline-muted-foreground/20 outline-1">⌘</Kbd>
								<Kbd className="outline-muted-foreground/20 outline-1">K</Kbd>
							</KbdGroup>
						</Button>
					</div>
					<Separator orientation="vertical" className="h-6" />
					<nav className="flex items-center gap-1">
						<Button variant="ghost" size="sm" asChild className="h-9 gap-2">
							<Link
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
							>
								<GitHub className="h-4 w-4" />
								<div className="flex items-center gap-2">
									<HugeiconsIcon
										icon={StarIcon}
										size={20}
										className="text-yellow-500"
									/>
									{stars !== null && (
										<span className="text-sm font-medium">
											{stars.toLocaleString()}
										</span>
									)}
								</div>
								<span className="sr-only">GitHub</span>
							</Link>
						</Button>
						<Separator orientation="vertical" className="h-6" />
						<ThemeToggle />
					</nav>
				</div>
			</div>
			<CommandMenu open={open} setOpen={setOpen} navigation={navigation} />
		</header>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
