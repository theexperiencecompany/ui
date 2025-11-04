import Link from "next/link";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative px-4">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-muted-foreground">Introducing Gaia UI</span>
          </div>
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Beautiful components
            <br className="hidden sm:inline" /> built with Radix UI and Tailwind
            CSS
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. Built with React.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Button size="lg" asChild>
              <Link href="/docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/heygaia/ui"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto grid max-w-[980px] gap-6 pb-8 pt-6 md:py-10 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Accessible</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Radix UI primitives for optimal accessibility and
                keyboard navigation.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Styled with Tailwind CSS. Easily customize colors, spacing, and
                more to match your brand.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Free to use in personal and commercial projects. MIT licensed
                with full source code.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-[980px] pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Start building today
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Copy and paste components into your application. Customize them to
              match your design system.
            </p>
            <Button size="lg" asChild>
              <Link href="/docs/components/raised-button">
                Browse Components
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
