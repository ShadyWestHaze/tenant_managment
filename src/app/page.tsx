import Link from 'next/link';
import Button from '@/components/button';
import React from 'react';
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next';
import '/app/global.css';

export default async function Home() {
    const session = await getServerSession(options);
    
    return (
        <>
        <div className="text-3xl">Tailwind</div>
              <h1 className="text-4xl text-green-500 hover:text-red-500 transition-colors">Home Page</h1>
            
            {session ? (
                <>
                    <Button text="Payments" href="/payments" />
                    <Button text="Logout" href="api/auth/signout" />
                </>
            ) : (
                <>
                <Button text="Login" href="api/auth/signin" />
                <Button text="Sign Up" href="api/signup" />
                </>
            )}
        </>
    );
}