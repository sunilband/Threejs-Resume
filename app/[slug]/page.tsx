"use client";
import BG from "@/Components/BG/BG";
import Character from "@/Components/Character/Character";
import Spinner from "@/Components/Spinner/Spinner";
import Viewer from "@/Components/Viewer/Viewer";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = {
  params: { slug: string };
};

const Page = ({ params }: Props) => {
  const [loaded, setLoaded] = useState({
    character: true,
    viewer: false,
  });

  return (
    <>
      {/* <BG />  */}

      {(!loaded.character || !loaded.viewer) && <Spinner />}

      <div
        className={`${loaded.character && loaded.viewer ? "visible" : "invisible"}`}
      >
        <Character setLoaded={setLoaded} loaded={loaded} />
      </div>

      <div
        className={`${loaded.character && loaded.viewer ? "visible" : "invisible"}`}
      >
        <Viewer slug={params.slug} setLoaded={setLoaded} loaded={loaded} />
      </div>
    </>
  );
};

export default Page;
