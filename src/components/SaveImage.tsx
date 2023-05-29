import * as htmlToImage from "html-to-image";
import { Button } from "./Button";

export const SaveImage = () => {
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
  return <Button onClick={onClick}>Save Image</Button>;
};
