"use client";

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import "../Viewer/Viewer.css"
import SittingMan from "../../public/sittingMan.svg";
import "./Viewer.css";
import { useRouter,usePathname } from "next/navigation";
import type { PDFDocumentProxy } from "pdfjs-dist";
import FileSaver from "file-saver";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
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
  const router = useRouter();
  const [file, setFile] = useState<PDFFile>(`./${slug}.pdf`);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const [visibleMan, setVisibleMan] = useState(false);
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setVisibleMan(true);
  }
  const handleDownloadPDF = () => {
    const fileURL = `./${slug}.pdf`;
    FileSaver.saveAs(fileURL, "sunil_band_resume.pdf");
  };
  const path=usePathname();
  const lastPath=path.split("/")[path.split("/").length-1];
  return (
    <div className="Example">
      
      <div className="head">
        <h1
          className="logo cursive"
          style={{ fontSize: "30px " }}
        >
          {" "}
          Sunil Band
        </h1>

        <div className="btnContainer">
         { lastPath!=="/contact"?<button className="Btn" onClick={handleDownloadPDF}>
            <svg
              className="svgIcon"
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
            </svg>
            <span className="icon2"></span>
          </button>:null}

          <button
            onClick={() => {
              lastPath!=="contact"?router.push(path+"/contact"):router.push(`/${path.split("/")[path.split("/").length-2]}`);
            }}
          >
            <span className="button_top">{
              lastPath==="contact"?"Resume":"Contact"
            }
            </span>
          </button>
        </div>
      </div>
      <div className="Example__container">
        <div
          className="Example__container__document"
          ref={setContainerRef}
          style={{ position: "relative" }}
        >
          {" "}
          {visibleMan && (
            <Image
              src={SittingMan}
              width={300}
              height={300}
              alt="sittingMan"
              className="manSvg"
            />
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
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
