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
        
              <h1 >Home Page</h1>
            
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