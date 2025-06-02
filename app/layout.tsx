import type { Metadata } from "next";
import { Cinzel, DM_Sans, Fanwood_Text } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Landing/footer";
import { Toaster } from "sonner";

const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });
const fanwood = Fanwood_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fanwood",
});
const cinzel = Cinzel({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "YOLO",
  description: "Ecommerce-platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.variable}`}>
        <main>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
