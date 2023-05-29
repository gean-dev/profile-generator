import { createEffect, createSignal } from "solid-js";
import { buttonStyles } from "./Button";
import { Select } from "./Select";

export const ImageUpload = () => {
  const [file, setFile] = createSignal<File>();
  let image: HTMLImageElement;
  createEffect(() => {
    const f = file();
    if (!f) return;
    const fr = new FileReader();
    fr.readAsDataURL(f);
    fr.onload = function () {
      image.src = this.result as string;
    };
  });
  return (
    <>
      <div class="relative">
        <img
          alt="background"
          src="/profile-card/card6.png"
          class="object-cover rounded-2xl shadow-xl"
        />
        <div class="absolute left-[4%] top-[22.5%] bottom-[4%] right-[62%] overflow-hidden">
          <img ref={image!} class="bg-gray-50 object-cover w-full h-[100%]" />
        </div>
      </div>
      <label
        class={buttonStyles({ colorScheme: "primary", class: "no-print" })}
      >
        Upload Picture
        <input
          id="file"
          type="file"
          class="hidden"
          accept="image/png, image/jpeg"
          onChange={(event) => {
            const { files } = event.target as HTMLInputElement;
            const file = files?.[0];
            if (!file) return;
            setFile(file);
          }}
        />
      </label>
      <Select options={["SHI81", "SHI82", "SHI83", "SHI84"]} />
    </>
  );
};
