import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                {/* Header content goes here */}
            </header>
            <main>{children}</main>
            <footer>
                {/* Footer content goes here */}
            </footer>
        </div>
    );
};

export default Layout;