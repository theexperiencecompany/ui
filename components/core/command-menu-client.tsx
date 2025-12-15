"use client";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { NavSection } from "@/types/nav-item";
import {
	Loading03Icon,
	File01Icon,
	Home01Icon,
	Package01Icon,
	HugeiconsIcon,
} from "@/components/icons";
import { useRouter } from "next/navigation";
import * as React from "react";

interface CommandMenuClientProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	navigation: NavSection[];
}

export function CommandMenuClient({
	open,
	setOpen,
	navigation,
}: CommandMenuClientProps) {
	const router = useRouter();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(!open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [open, setOpen]);

	const runCommand = React.useCallback(
		(command: () => void) => {
			setOpen(false);
			command();
		},
		[setOpen],
	);

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					<CommandItem onSelect={() => runCommand(() => router.push("/"))}>
						<HugeiconsIcon icon={Home01Icon} size={16} className="mr-2" />
						<span>Home</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
						<HugeiconsIcon icon={File01Icon} size={16} className="mr-2" />
						<span>Documentation</span>
					</CommandItem>
					<CommandItem
						onSelect={() => runCommand(() => router.push("/docs/installation"))}
					>
						<HugeiconsIcon icon={Package01Icon} size={16} className="mr-2" />
						<span>Installation</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Components">
					{navigation
						?.find((section) => section.title === "Components")
						?.items?.map((item) => (
							<CommandItem
								key={item.href}
								onSelect={() => runCommand(() => router.push(item.href))}
							>
								<HugeiconsIcon
									icon={Loading03Icon}
									size={16}
									className="mr-2"
								/>
								<span>{item.title}</span>
							</CommandItem>
						))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
