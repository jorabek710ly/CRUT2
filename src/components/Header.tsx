import React from 'react';

const Header = () => {
    return (
        <header className="site_header border-b border-gray-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
            <div className="container mx-auto px-4">
                <nav className="header_nav h-auto md:h-[80px] py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl md:text-3xl font-bold">React Query CRUD App</span>
                    </div>
                    <p className="text-sm opacity-80">Manage data efficiently with modern tools</p>
                </nav>
            </div>
        </header>
    );
};

export default React.memo(Header);
