import Footer from '@/components/ui/Footer';
import './globals.css';
import Navbar from '@/components/ui/Navbar';


export default function RootLayout({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata: { title: string; description: string };
}) {
  return (
    <>
      <html data-theme="dark">
        <head>
          <title>Run Book</title>
          <meta name="description" content="Run Book /" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
        <Footer />
      </html>
    </>
  );
}