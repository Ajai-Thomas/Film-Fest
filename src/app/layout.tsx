import "./globals.css";
import SmoothScroll from "../components/SmoothScroll"; //

export const metadata = {
  title: "TKM FLF",
  description: "By artists. For artists.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}