import Link from 'next/link';
import Button from '@/components/button';
import React from 'react';

export default function Home() {
    return (
        <>
            <h1>Home Page</h1>
            <Button text="Payments" href="/payments" />
        </>
    );
}