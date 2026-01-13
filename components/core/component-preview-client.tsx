"use client";

import * as React from "react";
import { codeToHtml } from "shiki";
import { CodeBlock } from "@/components/core/code-block";
import { FullscreenButton } from "@/components/core/fullscreen-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ComponentPreviewClientProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	code: string;
}

/**
 * Client component to render component preview with code tabs
 */
export function ComponentPreviewClient({
	children,
	className,
	code,
	...props
}: ComponentPreviewClientProps) {
	const [html, setHtml] = React.useState("");

	React.useEffect(() => {
		codeToHtml(code, {
			lang: "tsx",
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		}).then(setHtml);
	}, [code]);

	return (
		<div className={cn("my-6 w-full", className)} {...props}>
			<div className="rounded-lg border overflow-hidden">
				<Tabs defaultValue="preview" className="w-full gap-0">
					<TabsList className="bg-background rounded-t-lg rounded-b-none border-b p-0 w-full flex justify-start">
						<TabsTrigger
							value="preview"
							className="bg-background rounded-t-lg rounded-b-none data-[state=active]:bg-muted h-full rounded-none border-0 data-[state=active]:shadow-none px-5 font-normal shadow-none"
						>
							Preview
						</TabsTrigger>
						<TabsTrigger
							value="code"
							className="bg-background rounded-t-lg rounded-b-none data-[state=active]:bg-muted h-full rounded-none border-0 data-[state=active]:shadow-none px-5 font-normal shadow-none"
						>
							Code
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="preview"
						className="m-0 p-5 relative group overflow-visible"
					>
						<div className="flex flex-wrap items-center justify-center gap-4 min-h-[100px]">
							{children}
						</div>
						<div className="absolute right-4 top-4">
							<FullscreenButton>{children}</FullscreenButton>
						</div>
					</TabsContent>

					<TabsContent value="code" className="m-0 p-0 h-fit!">
						<CodeBlock
							raw={code}
							className="m-0 max-h-none rounded-none border-0 h-full p-4"
						>
							<code
								className="font-mono text-sm"
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						</CodeBlock>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
