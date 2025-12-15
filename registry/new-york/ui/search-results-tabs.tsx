"use client";

import { motion } from "framer-motion";
import { Globe02Icon, News01Icon, HugeiconsIcon } from "@/components/icons";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

export interface ImageResult {
	url: string;
	title?: string;
}

export interface WebResult {
	title: string;
	url: string;
	content: string;
	date?: string;
}

export interface NewsResult {
	title: string;
	url: string;
	content: string;
	score?: number;
	date?: string;
}

export interface SearchResults {
	web?: WebResult[];
	images?: string[] | ImageResult[];
	news?: NewsResult[];
}

interface SearchResultsTabsProps {
	search_results: SearchResults;
	onImageClick?: (imageUrl: string) => void;
}

export function SearchResultsTabs({
	search_results,
	onImageClick,
}: SearchResultsTabsProps) {
	return (
		<div className="w-full">
			<div className="space-y-6">
				{search_results.web && search_results.web?.length > 0 && (
					<SourcesButton web={search_results.web} />
				)}

				{search_results.images && search_results.images?.length > 0 && (
					<ImageResults
						images={search_results.images}
						onImageClick={onImageClick}
					/>
				)}

				{search_results.news && search_results.news?.length > 0 && (
					<NewsResults news={search_results.news} />
				)}
			</div>
		</div>
	);
}

interface ImageResultsProps {
	images: string[] | ImageResult[];
	onImageClick?: (imageUrl: string) => void;
}

function ImageResults({ images, onImageClick }: ImageResultsProps) {
	const [validImages, setValidImages] = useState<string[]>([]);

	useEffect(() => {
		const validateImages = async () => {
			// Convert to string array if needed
			const imageUrls = images.map((img) =>
				typeof img === "string" ? img : img.url,
			);

			// Filter out obviously invalid images first
			const potentiallyValidImages = imageUrls.filter(
				(imageUrl) => imageUrl && typeof imageUrl === "string",
			);

			// Test each image by trying to load it
			const validationPromises = potentiallyValidImages.map(
				(imageUrl) =>
					new Promise<string | null>((resolve) => {
						const img = new window.Image();

						const timeoutId = setTimeout(() => {
							resolve(null); // Timeout after 5 seconds
						}, 5000);

						img.onload = () => {
							clearTimeout(timeoutId);
							resolve(imageUrl);
						};

						img.onerror = () => {
							clearTimeout(timeoutId);
							resolve(null);
						};

						img.src = imageUrl;
					}),
			);

			try {
				const results = await Promise.all(validationPromises);
				const validImageUrls = results.filter(
					(url): url is string => url !== null,
				);
				setValidImages(validImageUrls);
			} catch (error) {
				console.error("Error validating images:", error);
				setValidImages([]);
			}
		};

		if (images && images.length > 0) validateImages();
		else setValidImages([]);
	}, [images]);

	if (validImages.length === 0) {
		return null;
	}

	return (
		<div className="my-4 flex w-full max-w-2xl -space-x-15 pr-2">
			{validImages.map((imageUrl, index) => (
				<ImageItem
					key={imageUrl}
					imageUrl={imageUrl}
					index={index}
					onImageClick={() => onImageClick?.(imageUrl)}
					totalImages={validImages.length}
				/>
			))}
		</div>
	);
}

interface ImageItemProps {
	imageUrl: string;
	index: number;
	onImageClick: () => void;
	totalImages: number;
}

function ImageItem({
	imageUrl,
	index,
	onImageClick,
	totalImages,
}: ImageItemProps) {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = useCallback(() => {
		setIsLoading(false);
	}, []);

	return (
		<motion.div
			onClick={onImageClick}
			className={`group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-200 ${
				(index + 1) % 2 === 0
					? "-rotate-7 hover:-rotate-0"
					: "rotate-7 hover:rotate-0"
			}`}
			style={{
				zIndex: index,
			}}
			initial={{ scale: 0.6, filter: "blur(10px)" }}
			animate={{ scale: 1, filter: "blur(0px)" }}
			transition={{
				delay: index * 0.1,
				duration: 0.1,
				ease: [0.19, 1, 0.22, 1],
				scale: {
					duration: 0.2,
				},
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.zIndex = (totalImages + 10).toString();
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.zIndex = index.toString();
			}}
		>
			{isLoading && (
				<div className="absolute inset-0 z-10">
					<Skeleton className="aspect-square h-full w-full rounded-2xl" />
				</div>
			)}
			<Image
				src={imageUrl}
				alt={`Search result image ${index + 1}`}
				width={700}
				height={700}
				className={`aspect-square h-full bg-zinc-800 object-cover transition ${
					isLoading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={handleLoad}
				priority={index < 3}
			/>
		</motion.div>
	);
}

interface SourcesButtonProps {
	web: WebResult[];
}

function SourcesButton({ web }: SourcesButtonProps) {
	return (
		<div className="flex justify-start">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="secondary" size="sm" className="rounded-full">
						<div className="flex -space-x-3">
							{web.slice(0, 4).map((result, index) => (
								<div
									key={index}
									className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-muted"
								>
									<Image
										src={`https://www.google.com/s2/favicons?domain=${
											new URL(result.url).hostname
										}&sz=64`}
										alt={`${new URL(result.url).hostname} favicon`}
										width={16}
										height={16}
										className="h-full w-full rounded-full"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.style.display = "none";
										}}
									/>
								</div>
							))}
						</div>
						<span className="font-medium">Search Results</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full max-w-lg bg-background/95 p-0 backdrop-blur-xl">
					<WebResults web={web} />
				</PopoverContent>
			</Popover>
		</div>
	);
}

interface NewsResultsProps {
	news: NewsResult[];
}

function NewsResults({ news }: NewsResultsProps) {
	return (
		<div className="space-y-2">
			{news.map((article, index) => (
				<div
					key={index}
					className="overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
				>
					<div className="flex flex-row items-center gap-2 transition-all hover:text-primary">
						<HugeiconsIcon icon={News01Icon} size={20} />
						<h2 className="truncate text-lg font-medium">
							<a href={article.url} target="_blank" rel="noopener noreferrer">
								{article.title}
							</a>
						</h2>
					</div>
					<p className="mb-1 line-clamp-2 text-sm text-muted-foreground">
						{article.content}
					</p>
					<div className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground">
						{article.score && (
							<span className="text-xs">Score: {article.score.toFixed(2)}</span>
						)}
						{article.date && (
							<span className="text-xs">
								{new Date(article.date).toLocaleDateString()}
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

interface WebResultsProps {
	web: WebResult[];
}

function WebResults({ web }: WebResultsProps) {
	return (
		<div className="max-h-80 w-full overflow-y-auto">
			{web.map((result, index) => (
				<div
					className="w-full border-b p-4 pb-3 transition-all hover:bg-accent/50"
					key={index}
				>
					<a
						href={result.url}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full space-y-1"
					>
						<h2 className="truncate text-sm font-medium">{result.title}</h2>
						<p className="line-clamp-2 text-xs text-muted-foreground">
							{result.content}
						</p>
						<div className="flex flex-wrap items-center gap-x-4 text-sm">
							<span className="flex items-center gap-2">
								<Image
									src={`https://www.google.com/s2/favicons?domain=${
										new URL(result.url).hostname
									}&sz=64`}
									alt={`${new URL(result.url).hostname} favicon`}
									width={16}
									height={16}
									className="rounded-full"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.style.display = "none";
									}}
								/>
								<span className="max-w-xs truncate text-xs text-primary hover:underline">
									{new URL(result.url).hostname}
								</span>
							</span>
							{result.date && (
								<span className="text-xs text-muted-foreground">
									{new Date(result.date).toLocaleDateString()}
								</span>
							)}
						</div>
					</a>
				</div>
			))}
		</div>
	);
}
