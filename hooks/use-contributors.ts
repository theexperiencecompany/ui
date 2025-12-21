import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Contributor {
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
}

interface GitHubStats {
	author?: { login: string };
	weeks?: Array<{ a: number; d: number }>;
	total: number;
}

export interface ContributorStats {
	login: string;
	name: string | null;
	avatar_url: string;
	html_url: string;
	contributions: number;
	additions: number;
	deletions: number;
	commits: number;
}

async function fetchContributors(): Promise<ContributorStats[]> {
	// Fetch contributors list
	const { data } = await axios.get<Contributor[] | { message?: string }>(
		"https://api.github.com/repos/heygaia/ui/contributors",
	);

	// Handle rate limiting or non-array responses
	if (!Array.isArray(data)) {
		if (data.message?.includes("rate limit")) {
			throw new Error("GitHub API rate limit exceeded. Please try again later.");
		}
		if (data.message) {
			throw new Error(data.message);
		}
		throw new Error("Failed to fetch contributors. Please try again later.");
	}

	const contributorData = data;

	// Fetch detailed stats for each contributor
	const detailedStats = await Promise.all(
		contributorData.slice(0, 20).map(async (contributor) => {
			try {
				const { data: userData } = await axios.get(
					`https://api.github.com/users/${contributor.login}`,
				);

				const { data: statsData } = await axios.get<GitHubStats[]>(
					"https://api.github.com/repos/heygaia/ui/stats/contributors",
				);

				const userStats = statsData?.find(
					(s) => s.author?.login === contributor.login,
				);

				const totalAdditions =
					userStats?.weeks?.reduce((sum, week) => sum + week.a, 0) || 0;
				const totalDeletions =
					userStats?.weeks?.reduce((sum, week) => sum + week.d, 0) || 0;
				const totalCommits = userStats?.total || contributor.contributions;

				return {
					login: contributor.login,
					name: userData.name,
					avatar_url: contributor.avatar_url,
					html_url: contributor.html_url,
					contributions: contributor.contributions,
					additions: totalAdditions,
					deletions: totalDeletions,
					commits: totalCommits,
				};
			} catch {
				return {
					login: contributor.login,
					name: null,
					avatar_url: contributor.avatar_url,
					html_url: contributor.html_url,
					contributions: contributor.contributions,
					additions: 0,
					deletions: 0,
					commits: contributor.contributions,
				};
			}
		}),
	);

	return detailedStats;
}

export function useContributors() {
	return useQuery<ContributorStats[], Error>({
		queryKey: ["contributors"],
		queryFn: fetchContributors,
		// Cache for 24 hours (GitHub contributor data is very static)
		staleTime: 24 * 60 * 60 * 1000,
		// Keep in cache for 48 hours
		gcTime: 48 * 60 * 60 * 1000,
	});
}
