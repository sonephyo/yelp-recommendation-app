'use client'
import React from 'react'
import {motion} from "framer-motion"

const Cbutton = ({text, classes, children}:
  {text?: string,
    classes: string,
    children?: React.ReactNode
  }
) => {
  return (
    <motion.button
      whileHover={{scale: 1.1}}
      whileTap= {{scale: 0.9}}
     className={` border-[3px] p-2 rounded-2xl border-cButtonBorderYellow bg-cYellow hover:bg-cButtonHoverYellow hover:text-white ${classes}`}>
      {text ? text: ""}
      {children ? children : ""}
    </motion.button>
  );
}

export default Cbutton