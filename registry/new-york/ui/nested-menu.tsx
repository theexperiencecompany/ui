"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface NestedMenuItem {
	/** Unique key for the item */
	key: string;
	/** Display label */
	label: string;
	/** Icon component */
	icon?: React.ComponentType<{ className?: string }>;
	/** Click handler */
	onSelect?: () => void;
	/** Whether this item has a submenu */
	hasSubmenu?: boolean;
	/** Submenu items (if hasSubmenu is true) */
	submenuItems?: NestedMenuItem[];
	/** Color variant */
	variant?: "default" | "danger";
	/** Additional className for custom styling */
	className?: string;
	/** Icon color (CSS color value) */
	iconColor?: string;
	/** Separator after this item */
	separator?: boolean;
}

export interface NestedMenuSectionProps {
	/** Section title */
	title?: string;
	/** Items in this section */
	items: NestedMenuItem[];
	/** Show divider after section */
	showDivider?: boolean;
}

// ============================================================================
// Hook: useNestedMenu
// ============================================================================

export function useNestedMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const [itemRef, setItemRef] = useState<HTMLElement | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setItemRef(e.currentTarget as HTMLElement);
		setIsOpen(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		// Longer delay to allow moving to submenu
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 300);
	}, []);

	const cancelClose = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		isOpen,
		setIsOpen,
		itemRef,
		handleMouseEnter,
		handleMouseLeave,
		cancelClose,
	};
}

// ============================================================================
// NestedMenuTooltip Component
// ============================================================================

export interface NestedMenuTooltipProps {
	/** Whether the tooltip is open */
	isOpen: boolean;
	/** Callback when open state changes */
	onOpenChange: (open: boolean) => void;
	/** Reference element to anchor the tooltip */
	itemRef: HTMLElement | null;
	/** Menu items to display */
	menuItems: NestedMenuItem[];
	/** Icon className */
	iconClassName?: string;
	/** Container className */
	className?: string;
	/** Called when mouse enters the tooltip */
	onMouseEnter?: () => void;
	/** Called when mouse leaves the tooltip */
	onMouseLeave?: () => void;
}

export function NestedMenuTooltip({
	isOpen,
	onOpenChange,
	itemRef,
	menuItems,
	iconClassName = "h-4 w-4",
	className,
	onMouseEnter,
	onMouseLeave,
}: NestedMenuTooltipProps) {
	if (!itemRef || !isOpen) return null;

	const rect = itemRef.getBoundingClientRect();

	return (
		<PopoverPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
			<PopoverPrimitive.Anchor
				style={{
					position: "fixed",
					left: rect.right,
					top: rect.top,
					width: 1,
					height: 1,
					pointerEvents: "none",
				}}
			/>
			<PopoverPrimitive.Portal>
				<PopoverPrimitive.Content
					side="right"
					align="start"
					sideOffset={8}
					className={cn(
						"z-50 min-w-[180px] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
						"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
						className,
					)}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				>
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<button
								type="button"
								key={item.key}
								className={cn(
									"flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors",
									"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
									item.variant === "danger" &&
										"text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10",
									item.className,
								)}
								onClick={() => {
									item.onSelect?.();
									onOpenChange(false);
								}}
							>
								{Icon && (
									<span
										style={
											item.iconColor ? { color: item.iconColor } : undefined
										}
									>
										<Icon className={cn(iconClassName)} />
									</span>
								)}
								<span className="flex-1 text-left">{item.label}</span>
							</button>
						);
					})}
				</PopoverPrimitive.Content>
			</PopoverPrimitive.Portal>
		</PopoverPrimitive.Root>
	);
}

// ============================================================================
// NestedMenuItem Component
// ============================================================================

export interface NestedMenuItemComponentProps {
	/** Menu item data */
	item: NestedMenuItem;
	/** Icon className */
	iconClassName?: string;
	/** Whether to show arrow for submenu */
	showSubmenuArrow?: boolean;
	/** Arrow icon component */
	arrowIcon?: React.ComponentType<{ className?: string }>;
	/** Mouse enter handler (for submenu trigger) */
	onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
	/** Mouse leave handler */
	onMouseLeave?: () => void;
}

export function NestedMenuItemComponent({
	item,
	iconClassName = "h-4 w-4",
	showSubmenuArrow = true,
	arrowIcon: ArrowIcon,
	onMouseEnter,
	onMouseLeave,
}: NestedMenuItemComponentProps) {
	const Icon = item.icon;

	return (
		<button
			type="button"
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors",
				"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
				item.variant === "danger" &&
					"text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10",
				item.className,
			)}
			onClick={() => !item.hasSubmenu && item.onSelect?.()}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{Icon && (
				<span style={item.iconColor ? { color: item.iconColor } : undefined}>
					<Icon className={cn(iconClassName)} />
				</span>
			)}
			<span className="flex-1 text-left">{item.label}</span>
			{item.hasSubmenu && showSubmenuArrow && ArrowIcon && (
				<ArrowIcon className="h-4 w-4 text-muted-foreground" />
			)}
		</button>
	);
}

// ============================================================================
// NestedMenuSection Component
// ============================================================================

export interface NestedMenuSectionComponentProps
	extends NestedMenuSectionProps {
	/** Icon className */
	iconClassName?: string;
	/** Arrow icon for submenu items */
	arrowIcon?: React.ComponentType<{ className?: string }>;
	/** Callback when item with submenu is hovered */
	onSubmenuHover?: (
		item: NestedMenuItem,
		e: React.MouseEvent<HTMLElement>,
	) => void;
	/** Callback when mouse leaves submenu trigger */
	onSubmenuLeave?: () => void;
}

export function NestedMenuSection({
	title,
	items,
	showDivider = false,
	iconClassName = "h-4 w-4",
	arrowIcon,
	onSubmenuHover,
	onSubmenuLeave,
}: NestedMenuSectionComponentProps) {
	return (
		<div className="py-1">
			{title && (
				<div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
					{title}
				</div>
			)}
			{items.map((item) => (
				<React.Fragment key={item.key}>
					<NestedMenuItemComponent
						item={item}
						iconClassName={iconClassName}
						arrowIcon={arrowIcon}
						onMouseEnter={
							item.hasSubmenu ? (e) => onSubmenuHover?.(item, e) : undefined
						}
						onMouseLeave={item.hasSubmenu ? onSubmenuLeave : undefined}
					/>
					{item.separator && <div className="my-1 h-px bg-border" />}
				</React.Fragment>
			))}
			{showDivider && <div className="my-1 h-px bg-border" />}
		</div>
	);
}

// ============================================================================
// NestedMenu Component (Full Menu with built-in submenu handling)
// ============================================================================

export interface NestedMenuProps {
	/** Menu sections */
	sections: NestedMenuSectionProps[];
	/** Trigger element */
	trigger: React.ReactNode;
	/** Icon className */
	iconClassName?: string;
	/** Arrow icon for submenu items */
	arrowIcon?: React.ComponentType<{ className?: string }>;
	/** Menu placement */
	side?: "top" | "right" | "bottom" | "left";
	/** Alignment relative to trigger */
	align?: "start" | "center" | "end";
	/** Offset from trigger */
	sideOffset?: number;
	/** Container className */
	className?: string;
	/** Controlled open state */
	open?: boolean;
	/** Callback when open state changes */
	onOpenChange?: (open: boolean) => void;
}

export function NestedMenu({
	sections,
	trigger,
	iconClassName = "h-4 w-4",
	arrowIcon,
	side = "right",
	align = "start",
	sideOffset = 8,
	className,
	open: controlledOpen,
	onOpenChange,
}: NestedMenuProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange],
	);

	// Submenu state
	const [activeSubmenu, setActiveSubmenu] = useState<NestedMenuItem | null>(
		null,
	);
	const [submenuAnchor, setSubmenuAnchor] = useState<HTMLElement | null>(null);
	const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleSubmenuHover = useCallback(
		(item: NestedMenuItem, e: React.MouseEvent<HTMLElement>) => {
			if (submenuTimeoutRef.current) {
				clearTimeout(submenuTimeoutRef.current);
				submenuTimeoutRef.current = null;
			}
			setActiveSubmenu(item);
			setSubmenuAnchor(e.currentTarget);
		},
		[],
	);

	const handleSubmenuLeave = useCallback(() => {
		submenuTimeoutRef.current = setTimeout(() => {
			setActiveSubmenu(null);
			setSubmenuAnchor(null);
		}, 300);
	}, []);

	const handleSubmenuEnter = useCallback(() => {
		if (submenuTimeoutRef.current) {
			clearTimeout(submenuTimeoutRef.current);
			submenuTimeoutRef.current = null;
		}
	}, []);

	useEffect(() => {
		return () => {
			if (submenuTimeoutRef.current) {
				clearTimeout(submenuTimeoutRef.current);
			}
		};
	}, []);

	// Close submenu when main menu closes
	useEffect(() => {
		if (!open) {
			setActiveSubmenu(null);
			setSubmenuAnchor(null);
		}
	}, [open]);

	return (
		<>
			<PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
				<PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
				<PopoverPrimitive.Portal>
					<PopoverPrimitive.Content
						side={side}
						align={align}
						sideOffset={sideOffset}
						className={cn(
							"z-50 min-w-[200px] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
							"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
							className,
						)}
					>
						{sections.map((section, index) => (
							<NestedMenuSection
								key={section.title || `section-${index}`}
								{...section}
								iconClassName={iconClassName}
								arrowIcon={arrowIcon}
								onSubmenuHover={handleSubmenuHover}
								onSubmenuLeave={handleSubmenuLeave}
							/>
						))}
					</PopoverPrimitive.Content>
				</PopoverPrimitive.Portal>
			</PopoverPrimitive.Root>

			{/* Submenu */}
			{activeSubmenu?.submenuItems && (
				<NestedMenuTooltip
					isOpen={!!activeSubmenu}
					onOpenChange={(isOpen) => {
						if (!isOpen) {
							setActiveSubmenu(null);
							setSubmenuAnchor(null);
						}
					}}
					itemRef={submenuAnchor}
					menuItems={activeSubmenu.submenuItems}
					iconClassName={iconClassName}
					onMouseEnter={handleSubmenuEnter}
					onMouseLeave={handleSubmenuLeave}
				/>
			)}
		</>
	);
}

export default NestedMenu;
