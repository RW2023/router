// import type { Metadata } from 'next';

import './globals.css';

export const metadata = {
  title: ' Run Book',
  description: 'An app to manage hospital runs for drivers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
