import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { ReduxProvider } from "@/store/slices/provider";
import { Toaster } from "@/components/ui/sonner";
import { url } from "inspector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opal | Video Transcoding",
  description: "Opal is a distributed video transcoding application. Convert audio video recordings from 360p to 1080p, generate accurate AI transcripts with distributed transcoding engine.",
  openGraph: {
    title: "Opal - Video Transcoding",
    description: "Opal is a distributed video transcoding application. Convert audio video recordings from 360p to 1080p, generate accurate AI transcripts with distributed transcoding engine.",
    url: "opal.kewalkhondekar.dev",
    siteName: "Opal",
    images: [{
      url: "https://res.cloudinary.com/kewalkhondekar/image/upload/v1760272954/opal/opal-bg_qy8pde.png",
      width: 1200,
      height: 630,
    }],
    locale: "en-us",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Opal - AI-Powered Video Transcoding & Transcription Apllication",
    description: "Convert videos from 360p to 1080p and generate AI transcripts instantly with Opal's distributed transcoding engine. Fast, scalable, and perfect for developers and content creators.",
    images: ["https://res.cloudinary.com/kewalkhondekar/image/upload/v1760272954/opal/opal-bg_qy8pde.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              {children}
              <Toaster />
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
