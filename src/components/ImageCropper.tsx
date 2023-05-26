import { Motion } from "@motionone/solid";
import { DragGesture, Gesture } from "@use-gesture/vanilla";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

export const ImageCropper = () => {
  const [transform, setTransform] = createSignal({ x: 0, y: 0, s: 1 });
  createEffect(() => {
    console.log(transform());
  });
  let img: HTMLImageElement;
  let parent: HTMLDivElement;
  onMount(() => {
    let gesture: Gesture | undefined;
    function initGesture() {
      gesture = new Gesture(
        parent,
        {
          onDrag: ({ pinching, cancel, offset: [x, y] }) => {
            if (pinching) return cancel();
            setTransform((tran) => ({ ...tran, x, y }));
          },
          onPinch: ({
            origin: [ox, oy],
            first,
            movement: [ms],
            offset: [s],
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
          drag: {
            from: () => [transform().x, transform().y],
            bounds: () => ({
              left: (-img.width / 2) * transform().s,
              right: (img.width / 2) * transform().s,
              top: (-img.height / 2) * transform().s,
              bottom: (img.height / 2) * transform().s,
            }),
          },
          pinch: { scaleBounds: { min: 0.5, max: 8 }, rubberband: true },
        }
      );
    }
    img.onload = initGesture;
    onCleanup(() => {
      gesture?.destroy();
    });
  });
  return (
    <div
      class="w-full bg-gray-900 overflow-hidden relative cursor-move rounded-2xl mt-4 touch-none"
      ref={parent!}
    >
      <Motion.img
        ref={img!}
        src="/profile-card/card6-01.png"
        animate={{ x: transform().x, y: transform().y, scale: transform().s }}
        draggable={false}
        transition={{ easing: "ease-in-out", duration: 0 }}
      />
      <div
        class="w-48 h-48 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-white/50 before:content-[' '] before:absolute before:left-1/3 before:right-1/3 before:top-0 before:bottom-0 before:border-x before:border-white/50 before:box-border after:content-[' '] after:absolute after:top-1/3 after:bottom-1/3 after:left-0 after:right-0 after:border-y after:border-white/50 after:box-border"
        style={{ "box-shadow": "0 0 0 9999px", color: "rgba(0,0,0,.5)" }}
      />
    </div>
  );
};
