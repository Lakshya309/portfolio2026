import "./globals.css";
import { galgo, roboto, bosch } from "./fonts";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import Footer from "../components/sections/Contact";
import CreativeNav from "../components/CreativeNav";
import PageTransitionWrapper from "../components/PageTransitionWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${galgo.variable} ${roboto.variable} ${bosch.variable}`}>
        <SmoothScrollProvider>
          <CreativeNav />
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}