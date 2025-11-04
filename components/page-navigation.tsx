"use client";

import { Button } from "@/components/ui/button";
import { docsConfig } from "@/config/site";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Footer } from "./footer";

interface PageNavigationProps {
  position?: "top" | "bottom";
  markdownContent?: string;
}

export function PageNavigation({
  position = "top",
  markdownContent,
}: PageNavigationProps) {
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

  // Flatten all sidebar items into a single array
  const allPages = docsConfig.sidebarNav.flatMap((section) =>
    section.items ? section.items : []
  );

  // Find current page index
  const currentIndex = allPages.findIndex((item) => item.href === pathname);
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
              <Check className="h-4 w-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
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
                <ChevronLeft className="h-5 w-5" />
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
                <ChevronRight className="h-5 w-5" />
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
              <ChevronLeft className="h-4 w-4" />
              <span>{prevPage.title}</span>
            </Link>
          </Button>
        )}
        {nextPage && (
          <Button variant="secondary" size="sm" asChild>
            <Link href={nextPage.href} className="flex items-center gap-2">
              <span>{nextPage.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <Footer />
    </div>
  );
}
