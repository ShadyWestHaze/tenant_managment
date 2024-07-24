"use client";
import React from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';

interface NavbarProps {
  session: any; 
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `block py-2 px-3 rounded ${
      isActive ? 'text-blue-500' : 'text-white hover:text-blue-700'
    } md:p-0 md:dark:hover:text-blue-500 ${
      isActive ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tallinas88</span>
        </Link>
        <div className="flex items-center space-x-8">
          <ul className="font-medium flex space-x-8">
            {session ? (
              <>
                <li>
                  <Link href="/" className={getLinkClass('/')}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={getLinkClass('/about')}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={getLinkClass('/services')}>
                    Services
                  </Link>
                </li>
                {session.user.ismanager && (
                  <>
                    <li>
                      <Link href="/managerDashboard" className={getLinkClass('/managerDashboard')}>
                        Dashboard
                      </Link>
                    </li>
                    
                  </>
                )}
             
              </>
            ) : (
              <>
                <li>
                  <Link href="/" className={getLinkClass('/')}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/api/auth/signin" className={getLinkClass('/api/auth/signin')}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/api/signup" className={getLinkClass('/api/signup')}>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={getLinkClass('/contact')}>
                    Contact
                  </Link>
                </li>
              </>
            )}
          </ul>
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="block py-2 px-3 text-white bg-blue-700 rounded hover:bg-blue-800 md:border-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
