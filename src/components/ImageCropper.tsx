import { Motion } from "@motionone/solid";
import { Gesture } from "@use-gesture/vanilla";
import { createSignal, onCleanup, onMount } from "solid-js";

export const ImageCropper = () => {
  const [transform, setTransform] = createSignal({ x: 0, y: 0, s: 1 });

  let img: HTMLImageElement;
  onMount(() => {
    const gesture = new Gesture(
      img,
      {
        onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
          if (pinching) return cancel();
          setTransform((tran) => ({ ...tran, x, y }));
        },
        onPinch: ({
          origin: [ox, oy],
          first,
          movement: [ms],
          offset: [s, a],
          memo,
        }) => {
          if (first) {
            const { width, height, x, y } = img.getBoundingClientRect();
            const tx = ox - (x + width / 2);
            const ty = oy - (y + height / 2);
            memo = [transform().x, transform().y, tx, ty];
          }
          const x = memo[0] - (ms - 1) * memo[2];
          const y = memo[1] - (ms - 1) * memo[3];
          setTransform({ s, x, y });
          return memo;
        },
      },
      {
        drag: { from: () => [transform().x, transform().y] },
        pinch: { scaleBounds: { min: 0.5, max: 8 }, rubberband: true },
      }
    );
    onCleanup(() => {
      gesture.destroy();
    });
  });
  return (
    <div class="w-full bg-gray-900 h-64 overflow-hidden">
      <Motion.img
        ref={img!}
        src="/card6-01.png"
        animate={{ x: transform().x, y: transform().y, scale: transform().s }}
        class="touch-none cursor-grab"
        draggable={false}
        transition={{ easing: "ease-in-out", duration: 0 }}
      />
    </div>
  );
};
