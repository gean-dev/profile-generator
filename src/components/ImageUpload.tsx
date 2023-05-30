import { createEffect, createSignal, createMemo } from "solid-js";
import { buttonStyles } from "./Button";
import { Select } from "./Select";
import { Button } from "./Button";
import { SaveImage } from "./SaveImage";
import { Toaster } from "solid-toast";

export const ImageUpload = () => {
  const [file, setFile] = createSignal<File>();
  let fileInput: HTMLInputElement;
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
  let input: HTMLInputElement;
  const [name, setName] = createSignal("YOUR NAME...");
  const [year, setYear] = createSignal(YEARS[0]);
  const [card, setCard] = createSignal(CARDS[0]);
  const cardPath = createMemo(
    () => `/profile-card/card${CARDS.indexOf(card())}.png`
  );
  const show = createMemo(() => !!file());
  return (
    <>
      <Toaster position="top-center" containerClassName="no-print" />
      <div class="relative">
        <img alt="background" src={cardPath()} class="object-cover" />
        <div
          class="absolute left-[4%] top-[22.5%] bottom-[4%] right-[62%] overflow-hidden cursor-pointer"
          onClick={() => fileInput.click()}
        >
          <img ref={image!} class="bg-gray-50 object-cover w-full h-[100%]" />
        </div>
        <input
          ref={input!}
          class="absolute left-[58%] top-[31%] text-[11px] text-gray-800 w-24 bg-transparent focus:outline-none focus:border-violet-400 focus:ring-violet-400 focus:ring-2 rounded-sm"
          value={name()}
        />
        <span class="absolute left-[58%] top-[57%] text-xs text-red-700">
          {year()}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <label
            class={buttonStyles({
              colorScheme: "primary",
              class: "no-print flex-1",
            })}
          >
            Upload Picture
            <input
              ref={fileInput!}
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
          <Select options={CARDS} onChange={(value) => setCard(value)}>
            {card()}
          </Select>
        </div>
        <div class="flex gap-2">
          <Button onClick={() => input.select()}>Write Your Name</Button>
          <Select options={YEARS} onChange={(value) => setYear(value)}>
            {year()}
          </Select>
        </div>
      </div>
      <div class="flex justify-center mt-8 pr-4 no-print">
        <SaveImage show={show()} />
      </div>
    </>
  );
};
const YEARS = ["SHI84", "SHI83", "SHI82", "SHI81"];
const CARDS = ["Pink", "Orange", "Dark", "Red", "Cyan", "Purple"];
