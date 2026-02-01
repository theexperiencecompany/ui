"use client";

import { GitHubStarsButton } from "@/registry/new-york/ui/github-stars-button";

export default function GitHubStarsButtonDefault() {
  return (
    <div className="flex items-center gap-4">
      <GitHubStarsButton repo="theexperiencecompany/gaia" />
    </div>
  );
}
