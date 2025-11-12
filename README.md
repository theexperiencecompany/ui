# GAIA UI - Component Registry

A collection of production-ready UI components designed specifically for building AI assistants and chatbots. These are the components we use at GAIA, now available for anyone building conversational interfaces.

## Why This Library?

Building a great chat or assistant interface requires more than just generic UI components. We've spent countless hours refining these components to handle the unique challenges of conversational UIs.

Instead of reinventing the wheel, use the same battle-tested components that power GAIA.

## Getting Started

All components are compatible with the `shadcn` CLI, making installation effortless:

```bash
npx shadcn@latest add https://ui.heygaia.io/r/navbar-menu.json
```

Or add individual components:

```bash
npx shadcn@latest add https://ui.heygaia.io/r/raised-button.json
```

### Base Components

This registry uses standard shadcn/ui base components. Install them separately:

```bash
npx shadcn@latest add button tooltip avatar dropdown-menu popover skeleton
```

## Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get up and running in minutes
- **[Registry Documentation](./REGISTRY.md)** - Complete guide for contributors
- **[Component Docs](https://ui.heygaia.io)** - Live examples and API reference

## For Contributors

### Adding a New Component

1. Create your component in `registry/new-york/ui/`
2. Add entry to `registry.json`
3. Run `pnpm run registry:build`
4. Test with `npx shadcn@latest add http://localhost:3000/r/[component-name].json`

See [REGISTRY.md](./REGISTRY.md) for detailed instructions.

### Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm run dev

# Build registry
pnpm run registry:build

# Type check
pnpm run type
```

## Registry Structure

```
registry/new-york/ui/     ← Components (shareable)
lib/utils/                ← Utilities (shareable)
public/r/                 ← Generated JSON files
registry.json             ← Registry definition
```

## Built With

- **Next.js 15** - For the documentation and registry
- **Tailwind CSS v4** - For styling
- **TypeScript** - For type safety
- **Radix UI** - For accessible primitives
- **Framer Motion** - For animations
- **shadcn CLI** - For component installation

## Contributing

We welcome contributions! Whether you're fixing bugs, improving documentation, or adding new components, we'd love your help.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Follow the guidelines in [REGISTRY.md](./REGISTRY.md)
4. Test your component thoroughly
5. Submit a pull request

## License

MIT License - feel free to use these components in your projects!

## Support

- 🌐 [Website](https://ui.heygaia.io)
- 🐙 [GitHub](https://github.com/theexperiencecompany/ui)
- 🐦 [Twitter](https://twitter.com/trygaia)

---

Built with ❤️ by the GAIA team
