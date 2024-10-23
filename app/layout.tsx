import type { Metadata } from "next";

import {Plus_Jakarta_Sans} from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/ui/theme-provider";




const fontSans=Plus_Jakarta_Sans({
  subsets:['latin'],
  weight:['300',"400",'500','600','700'],
  variable:'--font-sans'


})
export const metadata: Metadata = {
  icons:'/assets/icons/icon.svg',
  title: "MediZone",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
  );
}