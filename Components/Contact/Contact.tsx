"use client";
import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import { useRouter, usePathname } from "next/navigation";
import FileSaver from "file-saver";
import "../Viewer/Viewer.css";
import BG from "../BG/BG";

type Props = {};

const Contact = (props: Props) => {
  const form: any = useRef();
  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "portfolio",
        "template_0xdiby9",
        form.current,
        "LJ2tmRAE4H8BfsKr4"
      )
      .then(
        (result: any) => {
          if(result.status === 200){
            toast.success(
              "Thank you for contacting me! I will get back to you soon 👋"
            );
            form.current;
            form.current.reset();
          }
        },
        (error: any) => {
          toast.error("Something went wrong");
        }
      );
  };

  const resetForm = () => {
    form.current.reset();
  };

  const nameInputRef: any = useRef();
  const emailInputRef: any = useRef();
  const subjectInputRef: any = useRef();
  const messageInputRef: any = useRef();
  const focusInput = (inputRef: any) => {
    inputRef.current.focus();
  };

  const router = useRouter();
  const path = usePathname();
  const lastPath = path.split("/")[path.split("/").length - 1];
  console.log(lastPath);
  const handleDownloadPDF = () => {
    // const fileURL = `./${slug}.pdf`;
    const fileURL = `./${path.split("/")[path.split("/").length - 2]}.pdf`;
    console.log(fileURL);
    FileSaver.saveAs(fileURL, "sunil_band_resume.pdf");
  };

  const pushResumePage = () => {
    router.push(`/${path.split("/")[path.split("/").length - 2]}`);
  };
  return (
    <div className="containerContact">
      <BG />
      <div className="head">
        <h1
          className="logo cursive"
          style={{ fontSize: "30px " }}
          onClick={pushResumePage}
        >
          Sunil Band
        </h1>

        <div className="btnContainer">
          {lastPath !== "contact" ? (
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

          <button
            onClick={() => {
              lastPath !== "contact"
                ? router.push(path + "/contact")
                : router.push(
                    `/${path.split("/")[path.split("/").length - 2]}`
                  );
            }}
          >
            <span className="button_top">
              {lastPath === "contact" ? "Resume" : "Contact"}
            </span>
          </button>
        </div>
      </div>
      {/*  */}
      <div className="formPage ">
        <div className="form-container">
          <form className="form" ref={form} onSubmit={sendEmail}>
            <span className="heading">Get in touch</span>
            <input
              placeholder="Name"
              type="text"
              className="input"
              name="name"
              required
              ref={nameInputRef}
              onClick={() => focusInput(nameInputRef)}
            />
            <input
              placeholder="Email"
              id="mail"
              type="email"
              className="input"
              name="email"
              required
              ref={emailInputRef}
              onClick={() => focusInput(emailInputRef)}
            />
            <input
              placeholder="Subject"
              type="text"
              className="input"
              name="subject"
              required
              ref={subjectInputRef}
              onClick={() => focusInput(subjectInputRef)}
            />
            <textarea
              placeholder="Message"
              rows={10}
              cols={30}
              id="message"
              className="textarea"
              defaultValue={""}
              name="message"
              required
              ref={messageInputRef}
              onClick={() => focusInput(messageInputRef)}
            />
            <div className="button-container">
              <>
                <button className="send-button" type="submit">
                  Send
                </button>

              </>
              <div className="reset-button-container">
                <div
                  id="reset-btn"
                  className="reset-button"
                  onClick={resetForm}
                >
                  Reset
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
