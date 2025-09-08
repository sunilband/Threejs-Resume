"use client";

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import "../Viewer/Viewer.css";
import SittingMan from "../../public/sittingMan.svg";
import "./Viewer.css";
import { useRouter, usePathname } from "next/navigation";
import type { PDFDocumentProxy } from "pdfjs-dist";
import FileSaver from "file-saver";
import Wiggle from "../../public/wiggle.gif";

type Props = {
  slug: string;
};

const Header = ({ slug }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const lastPath = path.split("/")[path.split("/").length - 1];

  const handleDownloadPDF = () => {
    const fileURL = `./${slug}.pdf`;
    FileSaver.saveAs(fileURL, "sunil_band_resume.pdf");
  };

  return (
    <div className="head">
      <h1 className="logo cursive" style={{ fontSize: "30px " }}>
        Sunil Band
      </h1>

      <div className="btnContainer">
        {lastPath !== "/contact" ? (
          <button className="Btn" onClick={handleDownloadPDF}>
            <svg
              className="svgIcon"
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
            </svg>
            <span className="icon2"></span>
          </button>
        ) : null}

        {/* <button
          onClick={() => {
            lastPath !== "contact"
              ? router.push(path + "/contact")
              : router.push(`/${path.split("/")[path.split("/").length - 2]}`);
          }}
        >
          <span className="button_top">
            {lastPath === "contact" ? "Resume" : "Contact"}
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default Header;
