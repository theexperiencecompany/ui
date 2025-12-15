"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Moon02Icon, Sun03Icon, HugeiconsIcon } from "@/components/icons";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isDark = theme === "dark";

	return (
		<Toggle
			aria-label="Toggle theme"
			pressed={isDark}
			className="bg-background! hover:bg-foreground/5!"
			onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
		>
			{isDark ? (
				<HugeiconsIcon icon={Moon02Icon} size={19} />
			) : (
				<HugeiconsIcon icon={Sun03Icon} size={19} />
			)}
		</Toggle>
	);
}
