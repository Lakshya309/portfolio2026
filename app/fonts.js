import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const galgo = localFont({
  src: "./fonts/Galgo.ttf",
  variable: "--font-galgo",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const bosch = localFont({
  src: "./fonts/Bosch.otf",
  variable: "--font-bosch",

});


