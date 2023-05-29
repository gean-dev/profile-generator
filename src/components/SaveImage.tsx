import * as htmlToImage from "html-to-image";
import { Button } from "./Button";
import { Component } from "solid-js";
import clsx from "clsx";

interface SaveImageProps {
  show: boolean;
}

export const SaveImage: Component<SaveImageProps> = (props) => {
  const onClick = () => {
    const node = document.getElementById("card");
    htmlToImage
      .toPng(node!, {
        filter: (node: HTMLElement) => !node.classList?.contains("no-print"),
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      });
  };
  return (
    <div class={clsx(props.show ? "animate-bounce" : "hidden")}>
      <Button onClick={onClick}>Save & Share!</Button>
    </div>
  );
};
