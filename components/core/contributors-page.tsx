"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthorTooltip } from "@/registry/new-york/ui/author-tooltip";
import { useContributors } from "@/hooks/use-contributors";

export function ContributorsPage() {
	const {
		data: contributors = [],
		isLoading,
		error,
		refetch,
	} = useContributors();

	return (
		<>
			{isLoading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="flex flex-col items-center gap-3"
						>
							<Skeleton className="h-16 w-16 rounded-full" />
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			) : error ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<div className="text-muted-foreground mb-4">{error.message}</div>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => refetch()}
							className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
						>
							Try Again
						</button>
						<a
							href="https://github.com/heygaia/ui/graphs/contributors"
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
						>
							View on GitHub
						</a>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{contributors.map((contributor) => (
						<AuthorTooltip
							key={contributor.login}
							author={{
								name: contributor.name || contributor.login,
								avatar: contributor.avatar_url,
								role: `@${contributor.login}`,
								github: contributor.html_url,
							}}
							trigger={
								<a
									href={contributor.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-accent transition-colors group aspect-square cursor-pointer"
								>
									<Image
										src={contributor.avatar_url}
										alt={contributor.name || contributor.login}
										width={64}
										height={64}
										className="h-16 w-16 rounded-full"
									/>
									<div className="text-center">
										<div className="text-sm font-medium group-hover:text-foreground transition-colors truncate text-nowrap">
											{contributor.name || contributor.login}
										</div>
										<div className="text-xs text-muted-foreground">
											{contributor.commits} commits
										</div>
									</div>
								</a>
							}
						>
							<div className="text-xs space-y-1">
								<div className="flex justify-between gap-4">
									<span className="text-muted-foreground">Commits:</span>
									<span className="font-medium">{contributor.commits}</span>
								</div>
								<div className="flex justify-between gap-4">
									<span className="text-muted-foreground">Additions:</span>
									<span className="font-medium text-green-600">
										+{contributor.additions.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between gap-4">
									<span className="text-muted-foreground">Deletions:</span>
									<span className="font-medium text-red-600">
										-{contributor.deletions.toLocaleString()}
									</span>
								</div>
							</div>
						</AuthorTooltip>
					))}
				</div>
			)}

			<div className="mt-12 p-6 rounded-lg bg-muted/50 border">
				<h2 className="text-lg font-semibold mb-2">Want to contribute?</h2>
				<p className="text-sm text-muted-foreground">
					Check out our{" "}
					<a
						href="https://github.com/heygaia/ui/blob/main/CONTRIBUTING.md"
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground hover:underline"
					>
						contributing guide
					</a>{" "}
					to get started. We welcome contributions of all kinds!
				</p>
			</div>
		</>
	);
}
