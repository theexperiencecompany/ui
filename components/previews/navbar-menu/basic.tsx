"use client";

import { NavbarWithMenu } from "@/registry/new-york/ui/navbar-menu";
import {
	CreditCardIcon,
	Idea01Icon,
	MapsIcon,
	Message01Icon,
	HugeiconsIcon,
} from "@/components/icons";

export default function NavbarMenuBasic() {
	const sections = [
		{
			id: "pages",
			gridLayout: "grid w-full grid-cols-2 gap-4",
			links: [
				{
					label: "Get Started",
					href: "/login",
					description: "Sign Up / Login",
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
					description: "Discover workflows",
					icon: (
						<HugeiconsIcon icon={Idea01Icon} size={20} className="text-white" />
					),
				},
				{
					label: "Pricing",
					href: "/pricing",
					description: "Choose your plan",
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
					description: "What's coming next",
					icon: (
						<HugeiconsIcon icon={MapsIcon} size={20} className="text-white" />
					),
				},
			],
		},
	];

	return (
		<NavbarWithMenu
			sections={sections}
			navItems={[{ type: "dropdown", label: "Pages", menu: "pages" }]}
		/>
	);
}
