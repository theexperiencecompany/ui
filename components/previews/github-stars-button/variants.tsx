"use client";

import { GitHubStarsButton } from "@/registry/new-york/ui/github-stars-button";

export default function GitHubStarsButtonVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-zinc-400">With Label</p>
        <GitHubStarsButton repo="theexperiencecompany/gaia" showLabel />
      </div>
      <div>
        <p className="mb-2 text-sm text-zinc-400">Without Label</p>
        <GitHubStarsButton repo="theexperiencecompany/gaia" showLabel={false} />
      </div>
    </div>
  );
}
