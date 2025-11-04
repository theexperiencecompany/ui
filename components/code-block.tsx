"use client";

import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import * as React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  raw?: string;
}

export function CodeBlock({
  className,
  children,
  raw,
  ...props
}: CodeBlockProps) {
  const textContent =
    raw ||
    (typeof children === "object" &&
    children &&
    "props" in children &&
    typeof children.props === "object" &&
    children.props &&
    "children" in children.props
      ? String(children.props.children)
      : "");

  return (
    <div className="group relative">
      <pre
        className={cn(
          "overflow-x-auto rounded-xl dark:bg-zinc-900 bg-zinc-100 p-3",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute right-4 top-4">
        <CopyButton value={textContent} />
      </div>
    </div>
  );
}
