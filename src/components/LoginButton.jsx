"use client";
import {signIn} from 'next-auth/react';
import React from 'react';

export const LoginButton = () => {
    return (
        <button className='btn' onClick={() => signIn()}> Login Now  </button>
    )
}
