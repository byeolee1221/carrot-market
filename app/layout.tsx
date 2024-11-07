import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "캐럿마켓",
  description: "중고거래 플랫폼 | 캐럿마켓",
};

const notoSansKR = Noto_Sans_KR({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}>
        {children}
      </body>
    </html>
  );
}
