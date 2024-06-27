import Button from '@/components/button';
import React from 'react';

export default function Payments() {
    return (
        <>
            <h1>Payments List</h1>
            <ul>
                <li>
                    <Button text="Payment 1" href="/payments/1" />
                </li>
                <li>
                    <Button text="Payment 2" href="/payments/2" />
                </li>
                <li>
                    <Button text="Payment 3" href="/payments/3" />
                </li>
                <li>
                    <Button text="Payment 4" href="/payments/4" />
                </li>
                <li>
                    <Button text="Payment 5" href="/payments/5" />
                </li>
            </ul>
        </>
    );
}
