import { TableOfContents } from "@/components/table-of-contents";
import { PageNavigation } from "@/components/page-navigation";
import * as React from "react";

interface TocEntry {
  id: string;
  text: string;
  level: number;
}

interface DocPageLayoutProps {
  title: string;
  description: string;
  toc?: TocEntry[];
  markdownContent?: string;
  children: React.ReactNode;
}

export function DocPageLayout({
  title,
  description,
  toc = [],
  markdownContent,
  children,
}: DocPageLayoutProps) {
  const fullMarkdown = `# ${title}\n\n${description}\n\n${
    markdownContent || ""
  }`;

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 flex-1 xl:flex xl:gap-10">
      <div className="mx-auto w-full max-w-2xl min-w-0 flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
              {title}
            </h1>
            <PageNavigation position="top" markdownContent={fullMarkdown} />
          </div>
          <p className="text-md text-muted-foreground">{description}</p>
        </div>
        <div className="pt-10 space-y-6">{children}</div>
        <PageNavigation position="bottom" markdownContent={fullMarkdown} />
      </div>
      <div className="hidden text-sm xl:block w-[300px] shrink-0">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
