"use client";

import { Button } from "@/components/ui/button";
import {
	Tick02Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Copy01Icon,
	HugeiconsIcon,
} from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Footer } from "../ui/footer";
import { NavSection } from "@/types/nav-item";

interface PageNavigationClientProps {
	position?: "top" | "bottom";
	markdownContent?: string;
	navigation: NavSection[];
}

export function PageNavigationClient({
	position = "top",
	markdownContent,
	navigation,
}: PageNavigationClientProps) {
	const [copied, setCopied] = useState(false);
	const pathname = usePathname();

	const handleCopyPage = async () => {
		try {
			const contentToCopy = markdownContent || window.location.href;
			await navigator.clipboard.writeText(contentToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const allPages = navigation?.flatMap((section) =>
		section.items ? section.items : [],
	);

	const currentIndex = allPages?.findIndex((item) => item.href === pathname);
	const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
	const nextPage =
		currentIndex >= 0 && currentIndex < allPages.length - 1
			? allPages[currentIndex + 1]
			: null;

	if (position === "top") {
		return (
			<div className="flex items-center justify-end mb-6 gap-2">
				<Button
					variant="secondary"
					size="sm"
					onClick={handleCopyPage}
					className="shadow-none!"
				>
					{copied ? (
						<>
							<HugeiconsIcon icon={Tick02Icon} size={16} className="mr-1" />
							Copied!
						</>
					) : (
						<>
							<HugeiconsIcon icon={Copy01Icon} size={16} className="mr-1" />
							Copy page
						</>
					)}
				</Button>
				<div className="flex items-center gap-2">
					{prevPage && (
						<Button
							variant="secondary"
							size="icon"
							asChild
							className="shadow-none! h-8 w-8 aspect-square"
						>
							<Link href={prevPage.href}>
								<HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
							</Link>
						</Button>
					)}
					{nextPage && (
						<Button
							variant="secondary"
							size="icon"
							asChild
							className="shadow-none! h-8 w-8 aspect-square"
						>
							<Link href={nextPage.href}>
								<HugeiconsIcon icon={ArrowRight01Icon} size={20} />
							</Link>
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between gap-4 mt-12 pt-6">
				{prevPage && (
					<Button variant="secondary" size="sm" asChild>
						<Link href={prevPage.href} className="flex items-center gap-2">
							<HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
							<span>{prevPage.title}</span>
						</Link>
					</Button>
				)}
				{nextPage && (
					<Button variant="secondary" size="sm" asChild>
						<Link href={nextPage.href} className="flex items-center gap-2">
							<span>{nextPage.title}</span>
							<HugeiconsIcon icon={ArrowRight01Icon} size={20} />
						</Link>
					</Button>
				)}
			</div>
			<Footer />
		</div>
	);
}
