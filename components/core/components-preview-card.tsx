"use client";

import Link from "next/link";
import { type FC, useEffect, useState } from "react";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ComponentPreviewCardProps {
	componentName: string;
	title: string;
	href: string;
	className?: string;
}

export const ComponentPreviewCard: FC<ComponentPreviewCardProps> = ({
	componentName,
	title,
	href,
	className,
}) => {
	const [PreviewComponent, setPreviewComponent] = useState<FC | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		async function loadComponent() {
			setIsLoading(true);
			try {
				const module = await import(
					`@/components/previews/${componentName}/default`
				);
				if (mounted) {
					setPreviewComponent(() => module.default);
				}
			} catch (error) {
				console.error(`Failed to load preview for ${componentName}`, error);
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		}

		loadComponent();

		return () => {
			mounted = false;
		};
	}, [componentName]);

	return (
		<Link
			href={href}
			className={cn("group relative flex flex-col gap-2", className)}
		>
			{/* Preview Area */}
			<div className="relative w-full overflow-hidden rounded-xl transition-all duration-300 aspect-video">
				{isLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
					</div>
				) : PreviewComponent ? (
					<div
						className="absolute inset-0 origin-top-left"
						style={{
							width: "166.67%",
							height: "166.67%",
							transform: "scale(0.6)",
						}}
					>
						<div className="flex h-full w-full items-center justify-center p-4 pointer-events-none">
							<PreviewComponent />
						</div>
					</div>
				) : (
					<div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
						Preview not available
					</div>
				)}

				{/* Hover Overlay with Title */}
				<div
					className="absolute inset-x-0 bottom-0 flex items-end px-4 pb-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-md"
					style={{
						maskImage: "linear-gradient(to top, black, transparent)",
						WebkitMaskImage: "linear-gradient(to top, black, transparent)",
					}}
				>
					<div className="flex w-full items-center justify-between text-white">
						<span className="text-sm font-medium">{title}</span>
						<HugeiconsIcon
							icon={ArrowRight02Icon}
							size={16}
							className="text-white/80 transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};
