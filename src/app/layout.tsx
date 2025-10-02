import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/user-context";

export const metadata: Metadata = {
  title: "Psiboard",
  description: "Sistema de gestão para profissionais",
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased ${poppins.className}`}>
        <ReactQueryProvider>
          <ToastContainer />
          <UserProvider>{children}</UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
