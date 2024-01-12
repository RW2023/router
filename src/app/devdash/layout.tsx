//src/app/devdash/forms/layout.tsx
import React from 'react';
import Link from 'next/link';
import SubHeading from '@/components/ui/SubHeading';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav className="bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/devdash/forms"></Link>
              </div>
            </div>
            <div className="flex">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/devdash/forms"
                  className=" px-3 py-2 rounded-md  btn btn-primary"
                >
                 <h2>Forms</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
};

export default Layout;
