"use client";

import Image from "next/image";
import type { FC } from "react";
import {
	CheckmarkBadge02Icon,
	Comment01Icon,
	FavouriteIcon,
	HugeiconsIcon,
	MoreHorizontalIcon,
	RepeatIcon,
	Share01Icon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
export interface TwitterCardProps {
	author: {
		name: string;
		handle: string;
		avatar: string;
		verified?: boolean;
	};
	content: string;
	timestamp: string | Date;
	likes?: number;
	retweets?: number;
	replies?: number;
	media?: string;
	quoted?: {
		author: {
			name: string;
			handle: string;
			avatar: string;
		};
		content: string;
	};
	className?: string;
}

const formatNumber = (num: number): string => {
	if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
	if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
	return num.toString();
};

const formatTimestamp = (date: string | Date): string => {
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

	if (diffHours < 1) return "Just now";
	if (diffHours < 24) return `${diffHours}h`;

	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

export const TwitterCard: FC<TwitterCardProps> = ({
	author,
	content,
	timestamp,
	likes = 0,
	retweets = 0,
	replies = 0,
	media,
	quoted,
	className,
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl p-4",
				" bg-zinc-100 dark:bg-zinc-900",
				className,
			)}
		>
			{/* Author header */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<Image
						width={48}
						height={48}
						src={author.avatar}
						alt={author.name}
						className="h-12 w-12 rounded-full object-cover"
					/>
					<div>
						<div className="flex items-center gap-1">
							<span className="font-bold text-zinc-900 dark:text-zinc-100">
								{author.name}
							</span>
							{author.verified && (
								<HugeiconsIcon
									icon={CheckmarkBadge02Icon}
									size={16}
									className="text-blue-500"
								/>
							)}
						</div>
						<div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
							<span className="text-sm">@{author.handle}</span>
							<span>·</span>
							<span className="text-sm">{formatTimestamp(timestamp)}</span>
						</div>
					</div>
				</div>
				<button
					type="button"
					className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
					aria-label="More options"
				>
					<HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
				</button>
			</div>

			{/* Content */}
			<div className="mt-3">
				<p className="text-[15px] text-zinc-900 dark:text-zinc-100 whitespace-pre-line leading-relaxed">
					{content}
				</p>
			</div>

			{/* Media */}
			{media && (
				<div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
					{/** biome-ignore lint/performance/noImgElement: no specific height and width */}
					<img
						src={media}
						alt="Tweet media"
						className="w-full object-cover max-h-80"
					/>
				</div>
			)}

			{/* Quoted tweet */}
			{quoted && (
				<div
					className={cn(
						"mt-3 rounded-2xl border p-3",
						"border-zinc-200 dark:border-zinc-800",
					)}
				>
					<div className="flex items-center gap-2">
						<Image
							width={20}
							height={20}
							src={quoted.author.avatar}
							alt={quoted.author.name}
							className="h-5 w-5 rounded-full"
						/>
						<span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
							{quoted.author.name}
						</span>
						<span className="text-sm text-zinc-500 dark:text-zinc-400">
							@{quoted.author.handle}
						</span>
					</div>
					<p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
						{quoted.content}
					</p>
				</div>
			)}

			{/* Actions */}
			<div className="mt-4 flex items-center justify-between text-zinc-500 dark:text-zinc-400">
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-sky-50 hover:text-blue-500 dark:hover:bg-sky-900/20"
					aria-label="Reply"
				>
					<HugeiconsIcon icon={Comment01Icon} size={20} />
					{replies > 0 && (
						<span className="text-sm">{formatNumber(replies)}</span>
					)}
				</button>
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-green-50 hover:text-green-500 dark:hover:bg-green-900/20"
					aria-label="Retweet"
				>
					<HugeiconsIcon icon={RepeatIcon} size={20} />
					{retweets > 0 && (
						<span className="text-sm">{formatNumber(retweets)}</span>
					)}
				</button>
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-pink-900/20"
					aria-label="Like"
				>
					<HugeiconsIcon icon={FavouriteIcon} size={20} />
					{likes > 0 && <span className="text-sm">{formatNumber(likes)}</span>}
				</button>
				<button
					type="button"
					className="rounded-full p-2 hover:bg-sky-50 hover:text-blue-500 dark:hover:bg-sky-900/20"
					aria-label="Share"
				>
					<HugeiconsIcon icon={Share01Icon} size={20} />
				</button>
			</div>
		</div>
	);
};
