import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEngine from "@/components/BackgroundEngine";
import { Providers } from "@/components/Providers";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-cormorant",
});

export const metadata: Metadata = {
    title: "Mudra Minds | Sound Healing ",
    description: "Experience deep rest through sonic topography and vibrational sound healing at Mudra Minds.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${cormorant.variable} antialiased selection:bg-white selection:text-black font-sans bg-bg text-accent overflow-x-hidden w-screen`}>
                <Providers>
                    <BackgroundEngine />
                    <CustomCursor />
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
