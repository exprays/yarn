import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modalProvider";
import { SocketProvider } from "@/components/providers/socketProvider";
import { QueryProvider } from "@/components/providers/queryProvider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yarn",
  description: "Have something to do together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /** Mount Clerk provider here */
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="harmonyDark">
                <SocketProvider>
                    <ModalProvider />
                        <QueryProvider>
                            {children}
                        </QueryProvider>
                </SocketProvider>
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
