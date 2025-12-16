"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Books02Icon, HugeiconsIcon } from "../icons";

interface TocEntry {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	toc: TocEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
	const [activeId, setActiveId] = React.useState<string>("");

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-80px 0% -80% 0%" },
		);

		const headings = document.querySelectorAll("h2, h3, h4");
		headings.forEach((heading) => {
			observer.observe(heading);
		});

		return () => {
			headings.forEach((heading) => {
				observer.unobserve(heading);
			});
		};
	}, []);

	if (!toc || toc.length === 0) {
		return null;
	}

	return (
		<div>
			<p className="text-xs text-muted-foreground font-medium inline-flex gap-1">
				<HugeiconsIcon icon={Books02Icon} size={15} />
				On This Page
			</p>
			<nav>
				<ul className="m-0 list-none">
					{toc.map((item, index) => (
						<li
							key={`${item.id}-${index}`}
							className={cn("mt-0 pt-2", {
								"pl-4": item.level === 3,
								"pl-8": item.level === 4,
							})}
						>
							<a
								href={`#${item.id}`}
								onClick={(e) => {
									e.preventDefault();
									document.getElementById(item.id)?.scrollIntoView({
										behavior: "smooth",
									});
								}}
								className={cn(
									"inline-block no-underline transition-colors hover:text-foreground text-xs",
									activeId === item.id
										? "font-medium text-foreground"
										: "text-muted-foreground",
								)}
							>
								{item.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
