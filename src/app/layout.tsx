import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuizMaster - Challenge Your Knowledge",
  description:
    "Test your knowledge with engaging quizzes, compete with friends, and climb the leaderboards in the ultimate quiz experience.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if Clerk is properly configured
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (clerkPublishableKey) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    )
  }

  // Fallback without Clerk when not configured
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
