import React from 'react';
import '../../global.css';
import SignUpForm from '@/components/SignUpForm';

const SignUp: React.FC = () => {
    return (
        <>
            <div className="container mx-auto p-4">
                <SignUpForm />
            </div>
        </>
    );
};

export default SignUp;
