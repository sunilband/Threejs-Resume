"use client";

import { useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import "../Viewer/Viewer.css";
import SittingMan from "../../public/sittingMan.svg";
import "./Viewer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import Wiggle from "../../public/wiggle.gif";
import Spinner from "../Spinner/Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 900;

type PDFFile = string | File | null;

type Props = {
  slug: string;
};

export default function Sample({ slug }: Props) {
  const [file] = useState<PDFFile>(`./${slug}.pdf`);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [documentLoaded, setDocumentLoaded] = useState(false);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setDocumentLoaded(true);
  }

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <>
      {!documentLoaded && <Spinner />}
      <div
        className="Example__container__document sm:absolute  right-10 sm:w-[60%] pl-10"
        ref={setContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        {documentLoaded && (
          <>
            <Image
              src={SittingMan}
              width={300}
              height={300}
              alt="sittingMan"
              className="manSvg"
            />
            <Image
              id="reverse-gif"
              src={Wiggle}
              width={170}
              height={170}
              alt="dog"
              className="dog reverse"
            />
          </>
        )}

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              // @ts-ignore
              width={containerWidth > 1000 ? 1000 : containerWidth * 0.9}
            />
          ))}
        </Document>
      </div>
    </>
  );
}
