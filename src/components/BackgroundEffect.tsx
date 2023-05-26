import { Motion } from "@motionone/solid";

export const BackgroundEffect = () => {
  return (
    <Motion.img
      alt="background effect"
      src="/profile-card/effect.png"
      class="object-cover left-0 top-0 right-0 bottom-0 absolute -z-10 h-[800px]"
      width={900}
      height={1600}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    />
  );
};
