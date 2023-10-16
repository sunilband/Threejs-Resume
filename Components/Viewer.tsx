"use client";

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import downloadLogo from "../public/downloadIcon.svg";
import SittingMan from "../public/sittingMan.svg";
import "./Viewer.css";
import { useRouter } from "next/navigation";
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


  const [visibleMan,setVisibleMan]=useState(false)
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    setVisibleMan(true)
  }
  const handleDownloadPDF = () => {
    const fileURL = `./${slug}.pdf`;
    FileSaver.saveAs(fileURL, "sunil_band_resume.pdf");
  };

  return (
    <div className="Example">
      <div className="head">
        <h1
          className="text-center  tracking-wider cursive font-bold text-black"
          style={{ fontSize: "30px " }}
        >
          {" "}
          Sunil Band
        </h1>

        <div className="btnContainer">
          <button onClick={handleDownloadPDF} className="dl">
            <Image src={downloadLogo} height={30} width={30} alt="download" />
          </button>
          <button
            className="contactBtn"
            onClick={() => {
              router.push("https://sunilband.netlify.app/#contact");
            }}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="Example__container">
     
        <div className="Example__container__document" ref={setContainerRef} 
        style={{position:"relative"}}
        > {visibleMan&&<Image src={SittingMan} width={300} height={300} alt="sittingMan" className="manSvg"/>}
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
