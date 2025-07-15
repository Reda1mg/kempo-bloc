// app/layout.tsx
import './globals.css';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen bg-gradient-to-b from-[#181818] via-[#232526] to-[#181818] p-0 m-0">
        <Sidebar />
        <main className="flex-1 p-6 bg-[#222225] text-white min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
