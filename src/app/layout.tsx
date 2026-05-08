import type { Metadata } from "next";
import { Archivo_Black, Work_Sans, Space_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Java Computer",
  description: "Modern E-commerce for PC & Laptops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="id"
        className={`${archivoBlack.variable} ${workSans.variable} ${spaceMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
