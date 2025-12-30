import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div>
      <Link href="/"> Home </Link>
      <Link href="/public"> Public </Link>
      <Link href="/private"> Private </Link>
      <Link href="/admin"> Admin </Link>
    </div>
  )
}

export default Navbar
