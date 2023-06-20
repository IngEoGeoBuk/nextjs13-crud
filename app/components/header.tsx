import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';
import Spinner from './common/spinner';

function LoginAndLogout() {
  const { status } = useSession();

  return (
    <div className="flex-2 w-32 text-white flex justify-around gap-2">
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div>
          {status === 'authenticated' ? (
            <button type="button" onClick={() => signOut()} className="round-none">
              logout
            </button>
          ) : (
            <button type="button" onClick={() => signIn('google')} className="round-none">
              login
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
      <LoginAndLogout />
    </header>
  );
}

export default Header;
