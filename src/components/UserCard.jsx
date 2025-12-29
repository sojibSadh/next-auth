"use client";

import { useSession } from 'next-auth/react'
import React from 'react'

function UserCard() {
    const session = useSession();
    console.log(session);
    return (
        <div>
            <h2>User - Client </h2>
            <div>
                {JSON.stringify(session)}
            </div>
        </div>
    )
}

export default UserCard
