import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Fishtail Infosolutions",
    default: "Fishtail Infosolutions - Your Digital Growth Partner",
  },
  description: "Fishtail Infosolutions is your premier partner for digital growth, offering end-to-end technology solutions from development to digital strategy.",
  keywords: ["Fishtail Infosolutions", "Digital Growth", "Web Development", "App Development", "Software Solutions", "Nepal IT Company"],
  authors: [{ name: "Fishtail Team" }],
  creator: "Fishtail Infosolutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fishtailinfosolutions.com",
    siteName: "Fishtail Infosolutions",
    title: "Fishtail Infosolutions - Your Digital Growth Partner",
    description: "Your premier partner for digital growth, offering end-to-end technology solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fishtail Infosolutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fishtail Infosolutions - Your Digital Growth Partner",
    description: "Your premier partner for digital growth, offering end-to-end technology solutions.",
    images: ["/og-image.png"],
    creator: "@fishtailinfo",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://fishtailinfosolutions.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
