import './globals.css';

export default function RootLayout({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata: { title: string; description: string };
}) {
  return (
    <>
      <head>
        <title>Run Book</title>
        <meta name="description" content='Run Book /' />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}