'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //        ${isOpen ? "hidden" : "block"}

  return (
    <>
      <div className="flex flex-col justify-center mx-10 my-6 text-2xl font-semibold">
        <div className="flex flex-col border-4 p-6 rounded-[3rem] border-cButtonStrokeBlue items-center gap-5 shadow-md shadow-cButtonShadowBlue">
          {/* Mobile Device View */}
          <div
            className={`flex flex-row w-full  justify-between items-center gap-6`}
          >
            <div className="w-[200px]">
              <Image
                src="logo/Whereabouts_logo.svg"
                alt="Whereabouts"
                width={200}
                height={16}
              />
            </div>
            <button className="w-[30px]">
              <Image
                src={isOpen ? `logo/cross_nav.svg` : `logo/menu_nav.svg`}
                alt="Menu"
                width={30}
                height={16}
                onClick={() => setIsOpen(!isOpen)}
              />
            </button>
          </div>
          <div
            className={`${
              isOpen ? "flex flex-col" : "hidden"
            } items-center gap-5 my-5 text-center`}
          >
            <Link href="">Project Information</Link>
            <Link href="">About Us</Link>
            <Link href="">Support</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation