import { Inter } from "next/font/google";
import Favicon from '/public/favicon.ico';

import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypt File",
  description: "Encrypt and Decrypt files in your browser.",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        {children}
        <div className="text-center">
          <footer>&copy; 2024 - Crypt File Developed by Mario </footer>
        </div>
      </body>
    </html>
  );
}
