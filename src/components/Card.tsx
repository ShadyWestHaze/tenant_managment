import React from 'react';

interface CardProps {
    title: string;
    value: number;
  }
  
  export default function Card({ title, value }: CardProps) {
    return (
      <div className="card-content">
        <div className="card-value text-3xl font-bold">{value}</div>
        <div className="card-title text-sm text-gray-600">{title}</div>
      </div>
    );
  }
  