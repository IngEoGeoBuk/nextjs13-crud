'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

const page = () => (
  <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col items-center">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <button
            type="button"
            onClick={() => signIn('google')}
            className="btn-primary"
          >
            login
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default page;
