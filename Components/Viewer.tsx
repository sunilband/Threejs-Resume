"use client";

import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import downloadLogo from "../public/downloadIcon.svg";
import "./Viewer.css";
import { useRouter } from 'next/navigation'
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

const maxWidth = 800;

type PDFFile = string | File | null;
type Props = {
  slug: string;
};
export default function Sample({ slug }: Props) {
  const router = useRouter()
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

  // function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const { files } = event.target;

  //   if (files && files[0]) {
  //     setFile(files[0] || null);
  //   }
  // }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  const handleDownloadPDF = () => {
    const fileURL = `./${slug}.pdf`;
    const file= new File([fileURL], "sunil_band_resume.pdf", { type: "application/pdf" });
    FileSaver.saveAs(file);
  };

  return (
    <div className="Example">
      <header className="flex justify-between glass px-4 ">
        <h1
          className="text-center  tracking-wider cursive font-bold"
          style={{ fontSize: "30px " }}
        >
          {" "}
          Sunil Band
        </h1>

        <div className="flex justify-center items-center gap-4">
        <button onClick={handleDownloadPDF} className="invert hover:scale-105 transition-all duration-200 ease-in-out"><Image src={downloadLogo} height={30} width={30} alt="download"/></button>
        <button className="font-medium  tracking-wider border p-3 rounded-xl bg-[#333333] text-white"
        onClick={()=>{router.push("https://sunilband.netlify.app/#contact")}}
        >Contact</button>
        </div>
        
      </header>
      <div className="Example__container">
        {/* <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div> */}
        <div className="Example__container__document" ref={setContainerRef}>
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
