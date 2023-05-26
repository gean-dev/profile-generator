import { DragGesture } from "@use-gesture/vanilla";
import { batch, createSignal, onCleanup, onMount } from "solid-js";
import { Motion } from "@motionone/solid";

export const ImageCropper = () => {
  let el: HTMLDivElement;
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [t, setT] = createSignal(0);
  onMount(() => {
    const gesture = new DragGesture(el, ({ active, movement: [mx, my] }) => {
      batch(() => {
        setX(active ? mx : 0);
        setY(active ? my : 0);
        setT(active ? 0 : 0.5);
      });
    });
    onCleanup(() => {
      gesture.destroy();
    });
  });
  return (
    <Motion.div
      ref={el!}
      animate={{ x: x(), y: y() }}
      transition={{ easing: "ease-in-out", duration: t() }}
      class="w-10 h-10 rounded-lg bg-violet-400 touch-none cursor-grab"
    />
  );
};
