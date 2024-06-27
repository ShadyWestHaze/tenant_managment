import React from 'react';

interface PaymentIDProps {
    params: {
        paymentId: string;
    };
}

export default function PaymentID({ params }: PaymentIDProps) {
    return <h1>Details about payment {params.paymentId}</h1>;
}
