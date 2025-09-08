import React from "react";
import Image from "next/image";
import spinnerSvg from "./spinner.svg";
type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="h-full min-h-full w-full min-w-full bg-white flex flex-col gap-10 justify-center items-center fixed z-[100] top-0 overflow-hidden">
      <Image src={spinnerSvg} alt="spinner" width={100} height={100} />
      <span className="text-xl">Cooking up an awesome resume for you !!</span>
    </div>
  );
};

export default Spinner;
