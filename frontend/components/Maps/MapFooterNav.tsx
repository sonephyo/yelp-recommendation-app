import Link from 'next/link'
import React from 'react'

const MapFooterNav = () => {
  return (
    <div className=' flex flex-row justify-center gap-8 p-4 w-screen border-t-[1px] border-gray-200 bg-white'>
        <div>
            <Link href="">Home</Link>
        </div>
        <div>
            <Link href="">Support</Link>
        </div>
        <div>
            <Link href="">About Us</Link>
        </div>
    </div>
  )
}

export default MapFooterNav