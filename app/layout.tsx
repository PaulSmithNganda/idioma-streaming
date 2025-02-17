import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Idioma streaming",
    description: "Idioma streaming platform",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </body>
        </html>
    );
}
