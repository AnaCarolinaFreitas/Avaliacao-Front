import React from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Orders 🛒",
    icons: {
    icon: "/icons/favicon.ico",
  },
    description: "Projeto de Frontend interligado a Backend e Banco de dados",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
