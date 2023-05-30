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
  const [name, setName] = createSignal("YOUR PASSWORD...");
  const [year, setYear] = createSignal(YEARS[0]);
  const [card, setCard] = createSignal(CARDS[0]);
  const cardPath = createMemo(() => `/card${CARDS.indexOf(card())}.png`);
  const show = createMemo(() => !!file());
  return (
    <>
      <Toaster position="top-center" containerClassName="no-print" />

      <div class="relative">
        <div class="absolute left-[3%] top-[3%] bg-[#ff851b] rounded-lg font-bold text-white px-[40%]">
          OTOG
        </div>
        <img alt="background" src={cardPath()} class="object-cover" />
        <div class="absolute bg-[#D9DCD9] object-cover left-[40%] top-[22.5%] bottom-[4%] right-[5%]"></div>
        <div class="absolute top-[29%] left-[43%]">
          <p class="font-bold">NAME</p>
        </div>
        <div class="absolute top-[43%] left-[43%]">
          <p>
            <span class="font-bold">FACULTY</span>{" "}
            <span class="text-blue-600 text-md">CSKKU</span>
          </p>
        </div>
        <div class="absolute top-[55%] left-[43%]">
          <p class="font-bold">ROLE</p>
        </div>
        <div
          class="absolute left-[4%] top-[22.5%] bottom-[4%] right-[62%] overflow-hidden cursor-pointer"
          onClick={() => fileInput.click()}
        >
          <img ref={image!} class="bg-gray-50 object-cover w-full h-[100%]" />
        </div>

        <input
          ref={input!}
          class="absolute left-[58%] top-[31.5%] text-[11px] text-gray-800 w-30 bg-transparent focus:outline-none focus:border-violet-400 focus:ring-violet-400 focus:ring-2 rounded-sm"
          value={name()}
        />
        <span class="absolute left-[58%] top-[58%] text-xs text-red-700">
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
const YEARS = [
  "Normal User",
  "Guard",
  "Admin Tier 1",
  "Admin Tier 1.5",
  "Admin Tier 2",
];
const CARDS = ["Pink", "Orange", "Dark", "Red", "Cyan", "Purple"];
