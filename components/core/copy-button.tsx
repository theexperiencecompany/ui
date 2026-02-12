"use client";

import * as React from "react";
import { Copy01Icon, HugeiconsIcon, Tick02Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CopyButtonProps {
	value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
	const [copied, setCopied] = React.useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					size="icon"
					variant={"secondary"}
					className="min-h-6 min-w-6 transition-opacity hover:bg-muted-foreground/20"
					onClick={copy}
				>
					{copied ? (
						<HugeiconsIcon icon={Tick02Icon} size={12} />
					) : (
						<HugeiconsIcon icon={Copy01Icon} size={12} />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>Copy Code to Clipboard</TooltipContent>
		</Tooltip>
	);
}
