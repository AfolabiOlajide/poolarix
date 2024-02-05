import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import NavigationHeader from "@/components/NavigationHeader";
import ThirdWebProviderContainer from "@/components/ThirdWebProviderContainer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Poolarix",
    description:
        "Next Genration Lottery Pool, with Quantum Random Number generation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} min-h-screen bg-dark text-purp`}
            >
                <Toaster richColors  position="top-right" />
                <ThirdWebProviderContainer>
                    <div
                        className="relative z-[3]"
                        id="loading-screen"
                    ></div>
                    <div
                        className="relative z-[2]"
                        id="create-pool-modal"
                    ></div>
                    <div className="relative z-[1] container-cont mx-auto w-[80%]">
                        <NavigationHeader />
                        <main>{children}</main>
                    </div>
                </ThirdWebProviderContainer>
            </body>
        </html>
    );
}
