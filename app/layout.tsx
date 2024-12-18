import { Toaster } from "sonner";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import ModelProvider from "@/components/providers/ModelProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: "Create Notion Clone",
  description: "Notes your future",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/dark-logo.svg",
        href: "/dark-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/light-logo.svg",
        href: "/light-logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="notion-theme"
            >
              <Toaster position="bottom-center" />
              <ModelProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
