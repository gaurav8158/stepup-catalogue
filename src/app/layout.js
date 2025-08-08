import { Assistant, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistassistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose as needed
  variable: '--font-assistant', // Optional if using Tailwind CSS
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Step Up",
  description: "Crafting a Sustainable Tomorrow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistassistant.variable} antialiased `}
      > <CartProvider>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
