import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    text: string;
    href: string;
}

const Button: React.FC<ButtonProps> = ({ text, href }) => {
    return (
        <Link href={href} legacyBehavior>
           <a style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                margin: '0 0.5rem', 
            }}>
                {text}
            </a>
        </Link>
    );
}

export default Button;
