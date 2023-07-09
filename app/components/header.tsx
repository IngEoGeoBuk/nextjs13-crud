import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';
import Spinner from './common/spinner';
import './styles.css';

function LoginAndLogout() {
  const { status } = useSession();

  return (
    <li>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div>
          {status === 'authenticated' ? (
            <button type="button" onClick={() => signOut()} className="header-item">logout</button>
          ) : (
            <button type="button" onClick={() => signIn('google')} className="header-item">login</button>
          )}
        </div>
      )}
    </li>
  );
}

function Header() {
  const router = useRouter();

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            type="button"
            className="flex items-center"
            onClick={() => router.push('/')}
          >
            <Image
              src="/images/logo.png"
              className="mr-3 dark:brightness-0 dark:invert"
              alt="Flowbite Logo"
              width={30}
              height={30}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UCL</span>
          </button>
          <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" className="header-item">Home</Link>
              </li>
              <li>
                <Link href="/best" className="header-item">Best</Link>
              </li>
              <li>
                <Link href="/my" className="header-item">My</Link>
              </li>
              <LoginAndLogout />
            </ul>
          </div>
        </div>
      </nav>

    </header>
  );
}

export default Header;
