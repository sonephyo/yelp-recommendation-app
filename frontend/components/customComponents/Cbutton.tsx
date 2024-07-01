'use client'
import React from 'react'
import {motion} from "framer-motion"

const Cbutton = ({text, classes}:
  {text: string,
    classes: string,
  }
) => {
  return (
    <motion.button
      whileHover={{scale: 1.1}}
      whileTap= {{scale: 0.9}}
     className={` border-[3px] p-2 rounded-2xl border-cButtonBorderYellow bg-cYellow hover:bg-cButtonHoverYellow hover:text-white ${classes}`}>
      {text}
    </motion.button>
  );
}

export default Cbutton