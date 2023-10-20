import BG from "@/Components/BG/BG";
import Viewer from "@/Components/Viewer/Viewer";
import React from "react";


type Props = {
  params: { slug: string };
};

const page = ({ params }: Props) => {
  return (
    <>
      <BG />
      <Viewer slug={params.slug} />
    </>
  );
};

export default page;
