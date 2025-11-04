export const siteConfig = {
  name: "Gaia UI",
  url: "https://ui.gaia.com",
  ogImage: "https://ui.gaia.com/og.jpg",
  description:
    "Beautiful, accessible components built with Radix UI and Tailwind CSS.",
  links: {
    github: "https://github.com/heygaia/ui",
    experienceCompany: "https://experience.heygaia.io",
  },
};

export type SiteConfig = typeof siteConfig;

export const docsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "Components",
          href: "/docs/components",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Raised Button",
          href: "/docs/components/raised-button",
        },
      ],
    },
  ],
};
