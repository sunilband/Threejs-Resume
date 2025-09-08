import BG from "@/Components/BG/BG";
import Header from "@/Components/header";
import Viewer from "@/Components/Viewer/Viewer";
import React, { useEffect } from "react";

type Props = {
  params: { slug: string };
};

const Page = ({ params }: Props) => {
  return (
    <>
      <Header slug={params.slug} />
      <BG />
      <Viewer slug={params.slug} />
    </>
  );
};

export default Page;
