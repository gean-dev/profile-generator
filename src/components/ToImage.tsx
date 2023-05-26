import * as htmlToImage from "html-to-image";

export const ToImage = () => {
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
    <button
      type="button"
      class="inline-flex justify-center rounded-xl border border-transparent bg-violet-100 px-4 py-2 text-sm font-bold tracking-wide text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      onClick={onClick}
    >
      Save Image
    </button>
  );
};
