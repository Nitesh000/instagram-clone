import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectMongoDB } from "@/libs/connect";
import { EdgeStoreProvider } from "@/libs/edgestore";

// connect to MongoDB
(async () => {
  await connectMongoDB();
})();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram",
  description: "Fast beautiful photo sharing",
  icons: [
    {
      url: "/favicon.png",
      href: "/favicon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
