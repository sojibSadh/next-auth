"use client"
import React from 'react'
import { LoginButton } from './LoginButton'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

function AuthButtons() {
    const session = useSession();

    return (
        <div>
            <div className="flex gap-5">
                {
                    session.status == "authenticated" ? (
                        <button className='btn' onClick={() => signOut()} > LogOut </button>
                    ) : (
                        <>
                            <LoginButton> </LoginButton>
                            <Link href={"/register"} className="btn">
                                Register
                            </Link>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default AuthButtons
