import "./globals.css";

export const metadata = {
  title: "Ndaru Farm Admin",
  description: "Pertanian Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
