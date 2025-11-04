"use client";

import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";
import { codeToHtml } from "shiki";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  code: string;
}

export function ComponentPreview({
  children,
  className,
  code,
  ...props
}: ComponentPreviewProps) {
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
      <div className="max-h-[600px] overflow-auto rounded-lg border">
        <Tabs defaultValue="preview" className="w-full gap-0">
          <TabsList className="bg-background rounded-none border-b p-0 w-full flex justify-start">
            <TabsTrigger
              value="preview"
              className="bg-background data-[state=active]:bg-muted h-full rounded-none border-0 data-[state=active]:shadow-none px-5 font-normal shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="bg-background data-[state=active]:bg-muted h-full rounded-none border-0 data-[state=active]:shadow-none px-5 font-normal shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="m-0 p-10 h-fit">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </TabsContent>

          <TabsContent value="code" className="m-0 p-0 h-fit!">
            <CodeBlock
              raw={code}
              className="m-0 max-h-none rounded-none border-0 h-full"
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
