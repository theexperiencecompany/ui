# AGENTS.md

Hey there! Welcome to the Gaia UI library. This guide will walk you through everything you need to know about adding new components, maintaining design consistency, and keeping things beautiful.

## Quick Start: Adding a New Component

When you add a new component, you'll need to touch a few places. Here's the checklist:

### 1. Create the Component File

Add your component to `registry/new-york/ui/your-component.tsx`. This is where the actual component code lives.

```
registry/
└── new-york/
    └── ui/
        └── your-component.tsx  ← Your new component
```

### 2. Register It

Open `registry.json` in the project root and add your component to the `items` array:

```json
{
  "name": "your-component",
  "type": "registry:ui",
  "title": "Your Component",
  "description": "A brief, compelling description of what this component does.",
  "dependencies": ["any-npm-packages"],
  "registryDependencies": ["icons", "other-gaia-components"],
  "files": [
    {
      "path": "registry/new-york/ui/your-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### 3. Add Preview Components

Create preview examples in `components/previews/your-component/`:

```
components/
└── previews/
    └── your-component/
        ├── default.tsx          ← Basic usage example
        ├── with-variants.tsx    ← Different variants
        └── custom-example.tsx   ← Any other demos
```

### 4. Write the Documentation

Create a docs page at `content/docs/components/your-component.mdx`:

```mdx
---
title: Your Component
description: What it does and why someone would use it.
---

<ComponentPreview name="your-component/default" />

## Usage

Show how to use it.

## Installation

<Tabs defaultValue="automatic" className="mt-4">
  <!-- Add both automatic and manual installation options -->
</Tabs>

## Props

Document all the props in a table.
```

### 5. Update Navigation (if needed)

If you're adding a new category or the component needs special placement, update `lib/navigation.ts`.

---

## Design Philosophy

We follow Apple's Human Interface Guidelines and modern design principles. Here's what that means in practice.

### Flat Design, No Outlines

Avoid heavy borders and outlines. Use these techniques instead:

- **Subtle backgrounds** — Differentiate elements with slight background color changes
- **Elevation through shadows** — Use soft, layered shadows for depth
- **Negative space** — Let elements breathe; whitespace is your friend
- **Color fills** — Solid, muted colors with proper opacity

```tsx
// ❌ Don't do this
<div className="border border-gray-300 rounded">

// ✅ Do this instead
<div className="bg-muted/50 rounded-xl shadow-sm">
```

### Visual Hierarchy

Guide the eye naturally through your component:

1. **Size matters** — Important elements should be larger
2. **Weight for emphasis** — Use font-weight 500-600 (medium to semibold) for headings, 400 for body text
3. **Color for attention** — Primary actions get the accent color, secondary actions stay muted
4. **Spacing for grouping** — Related items stay close, separate concerns stay apart

### Spacing & Padding

Be generous but intentional with space:

- **Touch targets** — Minimum 44x44px for interactive elements (Apple's recommendation)
- **Padding scale** — Stick to the Tailwind scale: `p-3`, `p-4`, `p-6`, `p-8`
- **Consistent gaps** — Use `gap-3` or `gap-4` for most layouts, `gap-6` or `gap-8` for section separation
- **Breathing room** — Cards need at least `p-4`, ideally `p-6`

```tsx
// Component padding guidelines
<Card className="p-6">                    // Outer container
  <CardHeader className="pb-4">           // Section spacing
    <CardTitle className="mb-2">          // Title to content
  </CardHeader>
  <CardContent className="space-y-4">     // Content gaps
```

### Typography

- **Headings** — Use the default font stack, weights 500-700
- **Body text** — 14-16px, weight 400, good line-height (1.5-1.6)
- **Labels** — 12-14px, weight 500, slightly muted color
- **Don't mix too many sizes** — Stick to 2-3 sizes per component max

### Color Usage

- **Primary/Accent** — Use sparingly for CTAs and important actions
- **Muted tones** — Background fills, secondary text, dividers
- **Semantic colors** — Red for destructive, green for success, yellow for warnings
- **Dark mode support** — Always design for both modes; use CSS variables

---

## Accessibility (A11y) – Non-Negotiable

Every component must be accessible. No exceptions.

### Keyboard Navigation

- All interactive elements must be focusable
- Logical tab order (follows visual flow)
- Visible focus indicators (don't remove outlines without adding custom focus styles)
- Support `Enter` and `Space` for activation
- `Escape` should close modals/dropdowns

```tsx
// Use proper interactive elements
<button onClick={...}>Submit</button>     // ✅ Accessible
<div onClick={...}>Submit</div>           // ❌ Not accessible

// If you must use div, add roles and keyboard handling
<div 
  role="button"
  tabIndex={0}
  onClick={...}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

### Screen Readers

- Meaningful labels for all inputs and buttons
- Use `aria-label` when visible text isn't enough
- Hide decorative elements with `aria-hidden="true"`
- Announce dynamic content changes with `aria-live`

```tsx
// Icon-only button needs a label
<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>
```

### Color Contrast

- Text must have at least 4.5:1 contrast ratio (WCAG AA)
- Large text (18px+) needs at least 3:1
- Interactive elements need visible states (hover, focus, active)
- Don't rely solely on color to convey information

### Motion

- Respect `prefers-reduced-motion`
- Keep animations subtle and purposeful
- Avoid content that flashes more than 3 times per second

```tsx
// Always check for reduced motion preference
const prefersReducedMotion = 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Or use CSS
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
  }
}
```

---

## Component Architecture

### We Use shadcn/ui

This library is built on [shadcn/ui](https://ui.shadcn.com/). When migrating components from the main Gaia repo:

1. **Replace HeroUI with shadcn equivalents** — Don't copy HeroUI components directly
2. **Use Radix primitives** — shadcn is built on Radix, so use those patterns
3. **Keep the styling consistent** — Match shadcn's approach to variants and className merging

```tsx
// ❌ HeroUI pattern from gaia repo
import { Accordion, AccordionItem } from "@heroui/accordion";

// ✅ shadcn pattern for gaia-ui
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
```

### cn() for Class Merging

Always use the `cn` utility for conditional classes:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className  // Allow consumer overrides
)} />
```

### Props Pattern

Export clear, well-typed interfaces:

```tsx
export interface YourComponentProps {
  /** Brief description of this prop */
  variant?: "default" | "outline" | "ghost";
  /** Always include className for customization */
  className?: string;
  /** Children when applicable */
  children?: React.ReactNode;
}
```

### File Organization

If your component has multiple parts:

```
registry/new-york/ui/
├── your-component.tsx           // Main component + compound parts
├── your-component.css           // CSS if needed (rare)
└── your-component-utils.ts      // Helper functions if needed
```

---

## Animation Guidelines

Motion should feel natural and purposeful.

### Timing

- **Micro-interactions** — 150-200ms (hover states, toggles)
- **Small transitions** — 200-300ms (dropdowns, tooltips)
- **Large transitions** — 300-500ms (modals, page transitions)
- **Never longer than 500ms** for UI animations

### Easing

- **ease-out** — For elements entering (start fast, end slow)
- **ease-in** — For elements leaving (start slow, end fast)
- **ease-in-out** — For elements that stay on screen while moving

```tsx
// Good transition setup
transition: all 200ms ease-out;
```

### What to Animate

- ✅ Opacity changes
- ✅ Transform (scale, translate, rotate)
- ✅ Background color
- ❌ Width/height (causes layout thrashing)
- ❌ Box shadows (can be expensive)

---

## Iconography

We use [Hugeicons](https://hugeicons.com/) through our `icons` component.

```tsx
import { Icons } from "@/components/icons";

<Icons.search className="size-5" />
<Icons.chevronDown className="size-4" />
```

### Icon Guidelines

- **Size consistency** — Use `size-4` (16px), `size-5` (20px), or `size-6` (24px)
- **Match visual weight** — Icons should feel balanced with text
- **Stroke width** — Consistent at 1.5-2px
- **Provide fallbacks** — Not all icons exist; handle gracefully

---

## Dark Mode

Design for both light and dark modes from the start.

### Use CSS Variables

```tsx
// ✅ Uses theme-aware colors
<div className="bg-background text-foreground">
<div className="text-muted-foreground">

// ❌ Hardcoded colors won't adapt
<div className="bg-white text-black">
```

### Test Both Modes

- Check contrast in both modes
- Ensure shadows are visible but not harsh in dark mode
- Adjust opacity if needed (things often need to be more subtle in dark mode)

---

## Performance Considerations

### Bundle Size

- Import only what you need from libraries
- Avoid importing entire icon sets
- Use dynamic imports for heavy components

```tsx
// ❌ Imports everything
import * as Icons from "lucide-react";

// ✅ Tree-shakeable
import { Search, ChevronDown } from "lucide-react";
```

### Rendering

- Use `React.memo()` for expensive components
- Avoid inline function definitions in JSX when possible
- Keep state as local as possible

---

## Testing Your Component

Before submitting:

1. **Visual check** — Does it look good in both themes?
2. **Keyboard test** — Can you use it without a mouse?
3. **Screen reader test** — Does it announce correctly?
4. **Responsive test** — Does it work on mobile widths?
5. **Edge cases** — Empty states, long text, many items?

---

## Common Patterns

### Compound Components

For complex components with multiple parts:

```tsx
const Card = ({ children, className }: CardProps) => (
  <div className={cn("card-base", className)}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);

export { Card, CardHeader, CardContent };
```

### Controlled & Uncontrolled

Support both patterns when dealing with state:

```tsx
interface Props {
  open?: boolean;           // Controlled
  defaultOpen?: boolean;    // Uncontrolled
  onOpenChange?: (open: boolean) => void;
}
```

### Forwarding Refs

Allow consumers to access the underlying DOM element:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("...", className)} {...props} />
  )
);
Button.displayName = "Button";
```

---

## Quick Checklist

Before you consider a component done:

- [ ] Works in light and dark mode
- [ ] Fully keyboard accessible
- [ ] Has proper ARIA labels
- [ ] Respects reduced motion preferences
- [ ] Uses semantic HTML elements
- [ ] Follows the spacing guidelines
- [ ] No hardcoded colors (uses CSS variables)
- [ ] Registered in `registry.json`
- [ ] Has preview components
- [ ] Has documentation with props table
- [ ] Types are exported

---

## Questions?

If something isn't covered here or you're unsure about a design decision, look at existing components for patterns. The `tool-calls-section`, `composer`, and `weather-card` components are good references for complex UI.

Keep it clean. Keep it accessible. Keep it beautiful. ✨
