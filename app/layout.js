import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import { Header } from "./components/layout/Header";
import { Copyright } from "lucide-react";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Uniblox Market",
  description: "Your Goto Marketplace.",
};

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className="w-full">
          <Header />
          <main className={`flex bg-white flex-col items-center justify-between flex-grow !focus:ring-0 ${inter.className}`}>
            <div className="w-full">
              {children}
            </div>
            <footer className="bottom-0 flex gap-2 justify-center text-zinc-500 w-full py-10">
              Copyright <Copyright /> Uniblox
            </footer>
            <ToastContainer />
          </main>
        </body>
      </html>
    </CartProvider>
  );
}
