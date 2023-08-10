"use client"

import React, { useState } from "react";
import Screen from "./Components/Center/Screen";
import LeftComponent from "./Components/Left/Left";
import Right from "./Components/RightDBOs/RightDbos";

export default function Home() {
  const [isLeftExpanded, setIsLeftExpanded] = useState(true);
  const [isRightExpanded, setIsRightExpanded] = useState(true);

  const [db,setDB]=React.useState<number>(1)

  const toggleLeft = () => {
    setIsLeftExpanded(!isLeftExpanded);
  };

  const toggleRight = () => {
    setIsRightExpanded(!isRightExpanded);
  };

  const [clicked, setClicked] = useState<string[]>([]);

  return (
    <div className="flex justify-between bg-[#ebe8ff] items-center">
      {/* Left Component */}
      <div
        className={`midSection bg-[#5A44D5] h-screen rounded-r-xl w-min px-6 flex flex-col ${
          isLeftExpanded ? "" : "-translate-x-full"
        }`}
      >
        <button className="self-start mb-4" onClick={toggleLeft}>
          Toggle Left
        </button>
        <LeftComponent clicked={clicked}/>
      </div>

      {/* Center Component */}
      <div className="midSection h-screen p-3 flex justify-center items-start">
        <Screen db={db} setClicked={setClicked} />
      </div>

      {/* Right Component */}
      <div
        className={`midSection h-screen p-6 flex flex-col ${
          isRightExpanded ? "" : "translate-x-full"
        }`}
      >
        <button className="self-start mb-4" onClick={toggleRight}>
          Toggle Right
        </button>
        <Right setDB={setDB}/>
      </div>
    </div>
  );
}
