import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { getServerSession } from 'next-auth/next';
import { options } from "../api/auth/[...nextauth]/options";
import '../global.css';

export default async function addManager() {
    return (
        <>
          <h1>The egle has landed </h1>            
        </>
    );
}
