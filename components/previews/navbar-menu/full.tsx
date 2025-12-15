"use client";

import {
	DiscordIcon,
	Github,
	LinkedinIcon,
	TwitterIcon,
	WhatsappIcon,
	YoutubeIcon,
} from "@/components/icons/social-icons";
import { NavbarWithMenu } from "@/registry/new-york/ui/navbar-menu";
import {
	Book01Icon,
	CreditCardIcon,
	HelpCircleIcon,
	Idea01Icon,
	MapsIcon,
	Message01Icon,
	PencilIcon,
	UserGroupIcon,
	HugeiconsIcon,
} from "@/components/icons";

export default function NavbarMenuFull() {
	const sections = [
		{
			id: "product",
			gridLayout: "grid w-full grid-cols-3 grid-rows-2 gap-4",
			links: [
				{
					label: "Get Started",
					href: "/login",
					description: "Sign Up / Login to your account",
					rowSpan: 2,
					backgroundImage: "/media/wallpapers/surreal.webp",
					icon: (
						<HugeiconsIcon
							icon={Message01Icon}
							size={20}
							className="text-white"
						/>
					),
				},
				{
					label: "Use Cases",
					href: "/use-cases",
					description: "Discover workflows and solutions",
					rowSpan: 2,
					backgroundImage: "/media/wallpapers/meadow.webp",
					icon: (
						<HugeiconsIcon icon={Idea01Icon} size={20} className="text-white" />
					),
				},
				{
					label: "Pricing",
					href: "/pricing",
					description: "Choose the perfect plan",
					icon: (
						<HugeiconsIcon
							icon={CreditCardIcon}
							size={20}
							className="text-white"
						/>
					),
				},
				{
					label: "Roadmap",
					href: "/roadmap",
					description: "See what's coming next",
					icon: (
						<HugeiconsIcon icon={MapsIcon} size={20} className="text-white" />
					),
				},
			],
		},
		{
			id: "resources",
			gridLayout: "grid w-full grid-cols-2 grid-rows-2 gap-4",
			links: [
				{
					label: "Blog",
					href: "/blog",
					description: "Latest updates and insights",
					icon: (
						<HugeiconsIcon icon={PencilIcon} size={20} className="text-white" />
					),
				},
				{
					label: "Documentation",
					href: "/docs",
					description: "Guides and API reference",
					icon: (
						<HugeiconsIcon icon={Book01Icon} size={20} className="text-white" />
					),
				},
				{
					label: "Help Center",
					href: "/help",
					description: "Get support and answers",
					icon: (
						<HugeiconsIcon
							icon={HelpCircleIcon}
							size={20}
							className="text-white"
						/>
					),
				},
				{
					label: "Community",
					href: "/community",
					description: "Join our community",
					icon: (
						<HugeiconsIcon
							icon={UserGroupIcon}
							size={20}
							className="text-white"
						/>
					),
				},
			],
		},
		{
			id: "socials",
			gridLayout: "grid w-full grid-cols-3 gap-4",
			links: [
				{
					label: "Discord",
					href: "https://discord.gg/gaia",
					description: "Join Discord Community",
					external: true,
					icon: <DiscordIcon className="h-5 w-5" color="#5865F2" />,
				},
				{
					label: "Twitter",
					href: "https://twitter.com/trygaia",
					description: "Follow us for updates",
					external: true,
					icon: <TwitterIcon className="h-5 w-5" color="#1DA1F2" />,
				},
				{
					label: "GitHub",
					href: "https://github.com/heygaia",
					description: "Check out our repos",
					external: true,
					icon: <Github className="h-5 w-5" />,
				},
				{
					label: "WhatsApp",
					href: "https://whatsapp.com/channel/gaia",
					description: "Join WhatsApp Community",
					external: true,
					icon: <WhatsappIcon className="h-5 w-5" color="#25D366" />,
				},
				{
					label: "YouTube",
					href: "https://youtube.com/@heygaia_io",
					description: "Subscribe to our channel",
					external: true,
					icon: <YoutubeIcon className="h-5 w-5" color="#FF0000" />,
				},
				{
					label: "LinkedIn",
					href: "https://linkedin.com/company/heygaia",
					description: "Follow our company page",
					external: true,
					icon: <LinkedinIcon className="h-5 w-5" color="#0077B5" />,
				},
			],
		},
	];

	return <NavbarWithMenu sections={sections} />;
}
