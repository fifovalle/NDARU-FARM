import "./globals.css";

export const metadata = {
  title: "Ndaru Farm",
  description: "Ndaru Farm Admin",
};

export default function TataLetakUtama({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
