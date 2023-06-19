import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="bg-blue-700 flex items-center py-3 gap-10 md:px-10">
      <Link className="flex-none flex items-center gap-4" href="/">
        <Image src="/images/logo.png" alt="logo" width={60} height={60} />
        <span className="text-3xl font-semibold text-white">UCL</span>
      </Link>
      <div className="flex-1 w-64">
        <nav>
          <ul className="flex">
            <li className="mr-6">
              <Link className="text-white" href="/">
                Home
              </Link>
            </li>
            <li className="mr-6">
              <Link className="text-white" href="/best">
                Best
              </Link>
            </li>
            <li className="mr-6">
              <Link className="text-white" href="/">
                My
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
