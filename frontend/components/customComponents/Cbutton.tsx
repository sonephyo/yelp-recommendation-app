import React from 'react'

const Cbutton = ({text, classes}:
  {text: string,
    classes: string,
  }
) => {
  return (
    <button className={`border-2 p-2 rounded-2xl border-cButtonBorderYellow bg-cYellow text-cButtonBorderYellow hover:bg-cButtonHoverYellow hover:text-white transition ${classes}`}>
      {text}
    </button>
  );
}

export default Cbutton