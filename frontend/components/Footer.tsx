import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-cLightBlue  w-full flex flex-col justify-center items-center pt-6 py-2">
      <div className="flex flex-col lg:flex-row justify-center gap-14">
        {/* Whereabouts */}
        <div className="flex flex-col gap-5">
          <Image
            src="logo/Whereabouts_logo.svg"
            alt="Whereabouts"
            height="300"
            width="300"
          />

          <div className="flex flex-col">
            <Link href="/about-us" className="">
              About Us
            </Link>
            {/* <Link href="" className="">
              Project Information
            </Link>
            <Link href="" className="">
              Support
            </Link> */}
          </div>
        </div>
        {/* Developers */}
        <div className="flex flex-col justify-center items-center gap-3">
          <h3 className="text-lg font-bold">Developers</h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div className="text-sm">
              <p className=" font-semibold text-base">Phone Pyae Sone Phyo (Soney)</p>
              <Link href="">Website Portfolio</Link>
              <div className="flex flex-row items-center">
                <Link href="https://github.com/sonephyo">
                  <Image
                    src="svgs/github.svg"
                    alt="github"
                    height="20"
                    width="20"
                  />
                </Link>
                <Link href="https://www.linkedin.com/in/soney7/">
                  <Image
                    src="svgs/linkedin.svg"
                    alt="linkedin"
                    height="30"
                    width="30"
                  />
                </Link>
              </div>
              <p>sonephyo7777777@gmail.com</p>
            </div>
            <div className=" text-sm">
              <p className=" font-semibold text-base">Saurav Lamichhane</p>
              <Link href="">Website Portfolio</Link>
              <div className="flex flex-row items-center">
                <Link href="https://github.com/s-Aura-v">
                  <Image
                    src="svgs/github.svg"
                    alt="github"
                    height="20"
                    width="20"
                  />
                </Link>
              </div>
              <p>sauravl2004@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-4 gap-2">
        <hr className="h-px w-[80vw]  bg-[#5980AB] border-0"></hr>
        <p className=" text-center">&#169; 2025, Phone Pyae Sone Phyo, Saurav. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
