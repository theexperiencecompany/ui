import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { PageNavigation } from "@/components/core/page-navigation";
import { TableOfContents } from "@/components/core/table-of-contents";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { getNavigation } from "@/lib/navigation";

interface TocEntry {
	id: string;
	text: string;
	level: number;
}

interface DocPageLayoutProps {
	title: string;
	description: string;
	logo?: string;
	toc?: TocEntry[];
	markdownContent?: string;
	children: React.ReactNode;
	breadcrumbs?: { title: string; href: string }[];
}

export function DocPageLayout({
	title,
	description,
	logo,
	toc = [],
	markdownContent,
	children,
	breadcrumbs = [],
}: DocPageLayoutProps) {
	const fullMarkdown = `# ${title}\n\n${description}\n\n${
		markdownContent || ""
	}`;
	const navigation = getNavigation();

	return (
		<main className="relative py-6 lg:gap-10 lg:py-8 flex-1 xl:flex xl:gap-10">
			<div className="mx-auto w-full max-w-4xl min-w-0 flex-1 pl-10">
				{breadcrumbs.length > 0 && (
					<nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
						<Link
							href="/docs"
							className="hover:text-foreground transition-colors"
						>
							Docs
						</Link>
						{breadcrumbs.map((crumb) => (
							<React.Fragment key={crumb.href}>
								<HugeiconsIcon icon={ArrowRight02Icon} size={16} />
								<Link
									href={crumb.href}
									className="hover:text-foreground transition-colors"
								>
									{crumb.title}
								</Link>
							</React.Fragment>
						))}
					</nav>
				)}
				{logo && (
					<div className="mb-6">
						<Image
							src={logo}
							alt={`${title} logo`}
							width={100}
							height={100}
							className="aspect-auto"
						/>
					</div>
				)}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
							{title}
						</h1>
						<PageNavigation
							position="top"
							markdownContent={fullMarkdown}
							navigation={navigation}
						/>
					</div>
					<p className="text-md text-muted-foreground">{description}</p>
				</div>
				<div className="pt-10 space-y-6">{children}</div>
				<PageNavigation
					position="bottom"
					markdownContent={fullMarkdown}
					navigation={navigation}
				/>
			</div>
			<div className="hidden text-sm xl:block w-[300px] shrink-0">
				<div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
					<TableOfContents toc={toc} />
				</div>
			</div>
		</main>
	);
}
