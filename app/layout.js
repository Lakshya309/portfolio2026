import "./globals.css";
import { galgo, roboto, bosch } from "./fonts";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import Footer from "../components/sections/Contact";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${galgo.variable} ${roboto.variable} ${bosch.variable}`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Footer/>
      </body>
    </html>
  );
}