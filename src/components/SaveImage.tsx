import * as htmlToImage from "html-to-image";
import { Button } from "./Button";
import type { Component } from "solid-js";
import clsx from "clsx";
import toast from "solid-toast";

interface SaveImageProps {
  show: boolean;
}

export const SaveImage: Component<SaveImageProps> = (props) => {
  const onClick = () => {
    const node = document.getElementById("card");
    const save = async () =>
      htmlToImage
        .toPng(node!, {
          filter: (node: HTMLElement) => !node.classList?.contains("no-print"),
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "profile-card.png";
          link.href = dataUrl;
          link.click();
        });
    toast.promise(save(), {
      loading: "Loading",
      success: "Success!",
      error: (
        <>
          <b>An error occurred 😔</b>
          <p>Please try another browser</p>
        </>
      ),
    });
  };
  return (
    <div class={clsx(props.show ? "animate-bounce" : "hidden")}>
      <Button onClick={onClick}>Save & Share!</Button>
    </div>
  );
};
