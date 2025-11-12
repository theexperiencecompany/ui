"use client";

import { motion, AnimatePresence } from "motion/react";
import * as React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";

export interface NavbarMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
  description?: string;
  backgroundImage?: string;
  rowSpan?: number;
}

export interface NavbarMenuSection {
  id: string;
  links: NavbarMenuLink[];
  gridLayout?: string;
}

export interface NavbarMenuProps {
  activeMenu: string;
  sections: NavbarMenuSection[];
  onClose?: () => void;
}

export interface NavbarWithMenuProps {
  sections: NavbarMenuSection[];
  navItems?: Array<
    | { type: "link"; label: string; href: string }
    | { type: "dropdown"; label: string; menu: string }
  >;
  logo?: React.ReactNode;
  cta?: React.ReactNode;
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title: string;
    children?: React.ReactNode;
    href: string;
    external?: boolean;
    icon?: React.ReactNode;
    backgroundImage?: string;
    rowSpan?: number;
  }
>(
  (
    {
      className,
      title,
      children,
      href,
      external,
      icon,
      backgroundImage,
      rowSpan,
      ...props
    },
    ref
  ) => {
    return (
      <li className={cn("list-none", rowSpan === 2 && "row-span-2")}>
        <a
          ref={ref}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn(
            "group relative flex h-full min-h-18 w-full flex-col justify-center overflow-hidden rounded-2xl bg-zinc-800/0 p-3.5 leading-none no-underline outline-none transition-all duration-150 select-none hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100",
            className
          )}
          {...props}
        >
          {backgroundImage && (
            <>
              <img
                src={backgroundImage}
                alt={title}
                className="absolute inset-0 z-0 h-full w-full object-cover transition-all group-hover:brightness-60"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </>
          )}
          <div
            className={cn(
              "flex items-start gap-3",
              backgroundImage && "relative z-[2] mt-auto"
            )}
          >
            {icon && (
              <span
                className={cn(
                  "relative flex min-h-10 min-w-10 items-center justify-center rounded-xl p-2 text-primary transition group-hover:text-zinc-300",
                  backgroundImage
                    ? "bg-white/5 backdrop-blur group-hover:bg-white/10"
                    : "bg-zinc-800/80 group-hover:bg-zinc-700/80"
                )}
              >
                {icon}
              </span>
            )}
            <div className="flex h-full flex-col justify-start gap-1 leading-none font-normal text-zinc-100">
              {title}

              {children && (
                <p
                  className={cn(
                    "line-clamp-2 text-sm leading-tight font-light text-zinc-500",
                    backgroundImage && "relative z-[2]"
                  )}
                >
                  {children}
                </p>
              )}
            </div>
          </div>
        </a>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export function NavbarMenu({ activeMenu, sections, onClose }: NavbarMenuProps) {
  const activeSection = sections.find((section) => section.id === activeMenu);

  if (!activeSection) return null;

  const gridLayout =
    activeSection.gridLayout || "grid w-full grid-cols-2 gap-4";

  return (
    <motion.div
      initial={{ scaleY: 0.95, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0.95, opacity: 0 }}
      transition={{
        ease: [0.19, 1, 0.15, 1.01],
      }}
      className={cn(
        "absolute top-full left-0 z-40 w-full origin-top overflow-hidden rounded-b-2xl border-1 border-y-0 border-white/5 bg-gradient-to-b from-zinc-950 to-zinc-900/30 backdrop-blur-2xl outline-none"
      )}
    >
      <div className="p-6">
        <ul className={gridLayout}>
          {activeSection.links.map((link) => (
            <ListItem
              key={link.href}
              href={link.href}
              title={link.label}
              external={link.external}
              icon={link.icon}
              backgroundImage={link.backgroundImage}
              rowSpan={link.rowSpan}
            >
              {link.description}
            </ListItem>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function NavbarWithMenu({
  sections,
  navItems,
  logo,
  cta,
}: NavbarWithMenuProps) {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const defaultNavItems = [
    { type: "dropdown", label: "Product", menu: "product" },
    { type: "dropdown", label: "Resources", menu: "resources" },
    { type: "dropdown", label: "Socials", menu: "socials" },
  ] as const;

  const items = navItems || defaultNavItems;

  const handleNavbarMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    setHoveredItem(menu);
  };

  return (
    <div className="min-h-[350px] w-full bg-zinc-950 p-4 flex items-start justify-center transition">
      {/* Remove this parent container to remove the background color and the height when needed. */}
      <div
        className="relative mx-auto w-screen max-w-4xl"
        onMouseLeave={handleNavbarMouseLeave}
      >
        <div
          className={cn(
            "navbar_content flex h-14 w-full items-center justify-between border border-white/5 px-3 backdrop-blur-md transition-all",
            activeDropdown
              ? "rounded-t-2xl border-b-0 bg-zinc-950"
              : "rounded-2xl bg-zinc-900/30"
          )}
        >
          <div className="flex items-center gap-2 px-2">
            {logo || (
              <Image
                src="/media/text_w_logo_white.webp"
                alt="Logo"
                width={100}
                height={30}
                className="object-contain"
              />
            )}
          </div>

          <div className="flex items-center gap-1 rounded-lg px-1 py-1">
            {items.map((item) =>
              item.type === "link" ? (
                <button
                  key={item.href}
                  className={cn(
                    "relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm transition-colors hover:bg-zinc-800/40",
                    hoveredItem === item.label.toLowerCase()
                      ? "text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                  onMouseEnter={() => {
                    setHoveredItem(item.label.toLowerCase());
                    setActiveDropdown(null);
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              ) : (
                <button
                  key={item.menu}
                  className="relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm text-zinc-400 capitalize transition-colors hover:text-zinc-100"
                  onMouseEnter={() => handleMouseEnter(item.menu)}
                >
                  {hoveredItem === item.menu && (
                    <div className="absolute inset-0 h-full w-full rounded-xl bg-zinc-800 transition-all duration-300 ease-out" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <span>
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </span>
                    <ChevronDown
                      height={17}
                      width={17}
                      className={cn(
                        "transition duration-200",
                        hoveredItem === item.menu && "rotate-180"
                      )}
                    />
                  </div>
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {cta || <RaisedButton color="#00bbff">Get Started</RaisedButton>}
          </div>
        </div>

        <AnimatePresence>
          {activeDropdown && (
            <NavbarMenu
              activeMenu={activeDropdown}
              sections={sections}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
