import React from "react";
import Image from "next/image";
import spinnerSvg from "./spinner.svg";
type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="h-screen w-screen max-w-[100%] max-h-[100%] flex justify-center items-center bg-white overflow-hidden">
      <Image src={spinnerSvg} alt="spinner" width={150} height={150} />
    </div>
  );
};

export default Spinner;
