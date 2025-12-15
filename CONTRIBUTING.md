# Adding New Components

This guide will walk you through adding a new component to the GAIA UI component library. We'll use a comprehensive approach that ensures consistency and completeness.

## Quick Reference Checklist

Before you start, here's what you'll need to create:

- [ ] Component implementation file(s) in `registry/new-york/ui/`
- [ ] Preview components in `components/previews/[component-name]/`
- [ ] Documentation in `content/docs/components/[component-name].mdx`
- [ ] Registry entry in `public/r/[component-name].json`
- [ ] Update `public/r/registry.json`
- [ ] Update `config/site.ts` navigation
- [ ] _(Optional)_ Helper components or utilities
- [ ] _(Optional)_ Install additional dependencies

---

## Icons

We use [Hugeicons](https://hugeicons.com) for all icons. The codebase supports both **Free (stroke)** and **Pro (solid)** icons.

### Default: Free Icons

Just run `pnpm install && pnpm dev` — free icons work out of the box. No license needed!

### Production: Pro Icons

The production website uses Pro (solid) icons. This is controlled by the `USE_PRO_ICONS` environment variable:

```bash
# Build with Pro icons (production)
USE_PRO_ICONS=true pnpm build

# Or use the shortcut
pnpm build:pro
```

### Testing Pro Icons Locally

If you have a Hugeicons Pro license:

1. Add your license key to `.npmrc`:
   ```
   //npm.hugeicons.com/:_authToken=YOUR_LICENSE_KEY
   ```

2. Run with Pro icons:
   ```bash
   USE_PRO_ICONS=true pnpm dev
   ```

### How It Works

- **Source code** always imports from `@hugeicons/core-free-icons`
- **At build time**, when `USE_PRO_ICONS=true`, webpack swaps all free icon imports to `@hugeicons-pro/core-solid-rounded`
- **Users who install registry components** always get free icons (the source code references free icons)

---

## Step-by-Step Guide

### 1. Component Implementation

**Location:** `registry/new-york/ui/[component-name].tsx`

Create your main component file. Follow these guidelines:

- Use TypeScript with proper type definitions
- Export all relevant types/interfaces
- Use "use client" directive if the component needs client-side interactivity
- Follow React best practices and hooks guidelines
- Use the existing UI components from `components/ui/` where possible

**Example structure:**

```tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface YourComponentProps {
  // Define your props here
  className?: string;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("your-base-classes", className)}>
      {/* Your component JSX */}
    </div>
  );
};
```

**For complex components with subcomponents:**

Create additional files in the same directory if needed:

- `registry/new-york/ui/[component-name].tsx` - Main component
- `registry/new-york/ui/[component-name]-item.tsx` - Subcomponent
- `registry/new-york/ui/[component-name]-icons.tsx` - Custom icons (if needed)

### 2. Create Preview Components

**Location:** `components/previews/[component-name]/`

Create multiple preview examples to showcase different use cases:

```
components/previews/[component-name]/
  ├── default.tsx       # Basic usage example
  ├── variants.tsx      # Different variants/styles
  ├── sizes.tsx         # Different sizes (if applicable)
  └── advanced.tsx      # Advanced features
```

**Example preview file:**

```tsx
"use client";

import { YourComponent } from "@/registry/new-york/ui/your-component";

export default function YourComponentDefault() {
  return (
    <div className="flex justify-center">
      <YourComponent />
    </div>
  );
}
```

**Tips for previews:**

- Each preview should be self-contained
- Use realistic sample data
- Show the component in different states
- Make previews visually appealing

### 3. Write Documentation

**Location:** `content/docs/components/[component-name].mdx`

Create comprehensive documentation with the following structure:

````mdx
---
title: Your Component Name
description: A brief, clear description of what your component does.
---

<ComponentPreview name="your-component/default" />

## Variants

Description of different variants...

<ComponentPreview name="your-component/variants" />

## Installation

<Tabs defaultValue="automatic" className="mt-4">
  <TabsList>
    <TabsTrigger value="automatic">Automatic</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>

<TabsContent value="automatic">
  <InstallCommand component="your-component" />
</TabsContent>

  <TabsContent value="manual">

Copy and paste the following code into your project.

<SourceCode filePath="registry/new-york/ui/your-component.tsx" />

{/* Include all additional files */}

<SourceCode filePath="registry/new-york/ui/your-component-helper.tsx" />

Install required dependencies:

```bash
npx shadcn@latest add button tooltip
```
````

  </TabsContent>
</Tabs>

## Usage

```tsx
import { YourComponent } from "@/components/ui/your-component";

export default function Example() {
  return <YourComponent />;
}
```

## Props

| Prop      | Type   | Default   | Description            |
| --------- | ------ | --------- | ---------------------- |
| className | string | undefined | Additional CSS classes |
| variant   | string | "default" | Component variant      |

## Examples

### Example 1

Description...

```tsx
<YourComponent variant="primary" />
```

### Example 2

Description...

```tsx
<YourComponent variant="secondary" />
```

````

**Documentation best practices:**
- Start with a clear, compelling preview
- Include all component variants
- Document all props with types and descriptions
- Provide multiple usage examples
- Include TypeScript type definitions
- Add tips, warnings, or notes where helpful
- Link to related components or documentation

### 4. Create Registry Entry

**a) Create individual registry file**

**Location:** `public/r/[component-name].json`

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "your-component",
  "type": "registry:ui",
  "title": "Your Component",
  "description": "A brief description of your component",
  "dependencies": ["package-name"],
  "registryDependencies": ["button", "tooltip"],
  "files": [
    {
      "path": "registry/new-york/ui/your-component.tsx",
      "type": "registry:ui"
    },
    {
      "path": "registry/new-york/ui/your-component-helper.tsx",
      "type": "registry:ui"
    }
  ]
}
````

**Field descriptions:**

- `name`: Kebab-case component name (for CLI installation)
- `type`: Always "registry:ui" for components
- `title`: Display name for the component
- `description`: Brief description shown in listings
- `dependencies`: NPM packages required
- `registryDependencies`: Other components from the registry (e.g., "button")
- `files`: Array of all files needed for the component

**b) Update main registry**

**Location:** `public/r/registry.json`

Add your component to the `items` array:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "gaia ui",
  "homepage": "https://ui.heygaia.io",
  "items": [
    // ... existing components
    {
      "name": "your-component",
      "type": "registry:ui",
      "title": "Your Component",
      "description": "A brief description",
      "dependencies": ["package-name"],
      "registryDependencies": ["button"],
      "files": [
        {
          "path": "registry/new-york/ui/your-component.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

### 5. Update Site Navigation

**Location:** `config/site.ts`

Add your component to the sidebar navigation under "Components":

```typescript
{
  title: "Components",
  items: [
    // ... existing components
    {
      title: "Your Component",
      href: "/docs/components/your-component",
    },
  ],
},
```

**Navigation tips:**

- Keep components in alphabetical order (optional but recommended)
- Use the same title as in your documentation
- The href should match your MDX file path

### 6. Helper Components & Utilities _(Optional)_

**For subcomponents:**

Create separate files for reusable subcomponents:

```
registry/new-york/ui/
  ├── your-component.tsx
  ├── your-component-item.tsx
  ├── your-component-header.tsx
  └── your-component-footer.tsx
```

**For custom icons:**

If your component needs custom SVG icons:

```tsx
// registry/new-york/ui/your-component-icons.tsx
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export const YourCustomIcon: React.FC<IconProps> = (props) => (
  <svg {...props}>{/* SVG content */}</svg>
);
```

**For utility functions:**

Create helper files if you have complex logic:

```tsx
// registry/new-york/ui/your-component-utils.tsx
export const helperFunction = (value: string) => {
  // Helper logic
};
```

### 7. Install Dependencies _(Optional)_

If your component needs external packages:

```bash
cd /path/to/components-library
pnpm add package-name
```

**Common dependencies:**

- `hugeicons` - For icons
- `@radix-ui/react-*` - For accessible UI primitives
- `class-variance-authority` - For variant styling
- `motion` - For animations

Update both `package.json` and lock file by running the install command.

### 8. Testing Your Component

Before submitting:

1. **Run the dev server:**

   ```bash
   pnpm dev
   ```

2. **Navigate to your component page:**

   ```
   http://localhost:3000/docs/components/your-component
   ```

3. **Verify:**

   - [ ] All previews render correctly
   - [ ] Documentation is clear and complete
   - [ ] Props table is accurate
   - [ ] Code examples work
   - [ ] Responsive design works
   - [ ] Dark mode works (if applicable)
   - [ ] Accessibility features work

4. **Test CLI installation:**
   ```bash
   npx shadcn@latest add your-component
   ```

---

## Complete Example: Weather Card

Here's a real example from our component library showing all files needed:

### File Structure

```
registry/new-york/ui/
  ├── weather-card.tsx              # Main component
  ├── weather-detail-item.tsx       # Subcomponent
  └── weather-icons.tsx             # Custom icons

components/previews/weather-card/
  ├── default.tsx                   # Basic preview
  ├── conditions.tsx                # Different weather conditions
  ├── with-forecast.tsx             # With forecast data
  └── units.tsx                     # Temperature units

content/docs/components/
  └── weather-card.mdx              # Documentation

public/r/
  ├── weather-card.json             # Component registry
  └── registry.json                 # Updated main registry

config/
  └── site.ts                       # Updated navigation
```

### Registry Entry

```json
{
  "name": "weather-card",
  "type": "registry:ui",
  "title": "Weather Card",
  "description": "A beautiful, interactive weather card component",
  "dependencies": ["@hugeicons/react", "@hugeicons/core-free-icons"],
  "registryDependencies": ["button", "dropdown-menu", "tooltip"],
  "files": [
    {
      "path": "registry/new-york/ui/weather-card.tsx",
      "type": "registry:ui"
    },
    {
      "path": "registry/new-york/ui/weather-detail-item.tsx",
      "type": "registry:ui"
    },
    {
      "path": "registry/new-york/ui/weather-icons.tsx",
      "type": "registry:ui"
    }
  ]
}
```

---

## Best Practices

### Component Design

- Keep components focused and single-purpose
- Make components composable when possible
- Provide sensible defaults
- Support customization through props and className
- Use TypeScript for type safety
- Follow accessibility guidelines (ARIA labels, keyboard navigation)

### Code Quality

- Use consistent naming conventions
- Add JSDoc comments for complex logic
- Keep files under 500 lines (split if larger)
- Use meaningful variable and function names
- Handle edge cases and errors gracefully

### Documentation

- Show, don't just tell (use previews)
- Document all props with types
- Include multiple usage examples
- Add notes for gotchas or special cases
- Link to related components
- Keep documentation up-to-date

### Preview Components

- Create at least 3-4 different previews
- Use realistic data
- Show different states (loading, error, empty, etc.)
- Make previews interactive when possible
- Ensure previews are visually appealing

---

## Common Patterns

### Variant-Based Components

Use `class-variance-authority` for variant styling:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-styles",
      primary: "primary-styles",
      secondary: "secondary-styles",
    },
    size: {
      sm: "small-styles",
      md: "medium-styles",
      lg: "large-styles",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export const Component: React.FC<ComponentProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <div
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

### Compound Components

Create related subcomponents:

```tsx
// Main component
export const Card = ({ children, className }) => (
  <div className={cn("card-base", className)}>{children}</div>
);

// Subcomponents
export const CardHeader = ({ children, className }) => (
  <div className={cn("card-header", className)}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("card-content", className)}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn("card-footer", className)}>{children}</div>
);
```

### Controlled vs Uncontrolled

Support both patterns when appropriate:

```tsx
export const Component = ({
  value: controlledValue,
  defaultValue,
  onChange,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  return <div>{/* Use value and handleChange */}</div>;
};
```

---

## Troubleshooting

### Component Not Showing in Docs

- Check that the MDX file is in the correct location
- Verify the component is added to `config/site.ts`
- Ensure the MDX frontmatter is correct
- Restart the dev server

### Preview Not Rendering

- Check the preview component file name matches the MDX reference
- Verify the preview is exported as default
- Check for console errors in the browser
- Ensure all imports are correct

### Installation Failing

- Verify `public/r/[component-name].json` exists
- Check that the component is in `public/r/registry.json`
- Ensure all file paths in the registry are correct
- Verify dependencies are listed correctly

### Styling Issues

- Check that Tailwind classes are not being purged
- Verify custom CSS is imported if needed
- Test in both light and dark mode
- Check responsive breakpoints

---

## Getting Help

If you run into issues:

1. Check existing components for reference
2. Review this guide carefully
3. Look at the Weather Card implementation as an example
4. Check the console for errors
5. Ask in the project Discord/Slack

---

## Final Checklist

Before submitting your component:

- [ ] Component implementation is complete and tested
- [ ] All TypeScript types are properly defined
- [ ] At least 3-4 preview variants created
- [ ] Documentation is comprehensive and clear
- [ ] Props table is accurate and complete
- [ ] Registry files are created and updated
- [ ] Navigation is updated in site config
- [ ] Component works in dev environment
- [ ] CLI installation tested and works
- [ ] Responsive design verified
- [ ] Dark mode tested (if applicable)
- [ ] Accessibility checked
- [ ] Code is clean and well-commented
- [ ] No console errors or warnings
