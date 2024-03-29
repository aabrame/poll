'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { createContext } from "react";
import useSecurity, { ConnectedUser, SecurityData } from "@/hooks/useSecurity.hook";
import { Button } from "@mui/material";
import { NavBar } from "@/components/navBar";
import SecurityInterceptor from "@/interceptors/security.interceptor";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export const SecurityContext = createContext<SecurityData>({ connectedUser: undefined, login: () => Promise.resolve(), logout: () => {}, refresh: () => Promise.resolve('')});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const security = useSecurity();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SecurityContext.Provider value={security}>
          <SecurityInterceptor>
            <NavBar></NavBar>
            {children}
          </SecurityInterceptor>
        </SecurityContext.Provider>
      </body>
    </html>
  );
}
