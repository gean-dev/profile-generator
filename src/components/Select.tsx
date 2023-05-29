import { Component, For, JSX, ParentProps, children } from "solid-js";
import {
  Menu,
  MenuItem,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "solid-headless";
import clsx from "clsx";
import { buttonStyles } from "./Button";

interface SelectProps {
  options: string[];
  onChange: (value: any) => void;
}

export const Select: Component<ParentProps<SelectProps>> = (props) => {
  const c = children(() => props.children);
  return (
    <Popover defaultOpen={false} class="relative flex-1">
      {({ isOpen }) => (
        <>
          <PopoverButton
            class={clsx(
              isOpen() && "text-opacity-90",
              buttonStyles({ class: "w-full no-print" })
            )}
          >
            <span>{c()}</span>
            <ChevronDownIcon
              class={clsx(
                isOpen() && "text-opacity-70",
                "ml-2 h-5 w-5 text-violet-300 group-hover:text-opacity-80 transition ease-in-out duration-150"
              )}
              aria-hidden="true"
            />
          </PopoverButton>
          <Transition
            show={isOpen()}
            enter="transition duration-200"
            enterFrom="opacity-0 -translate-y-1 scale-50"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-1 scale-50"
          >
            <PopoverPanel
              unmount={false}
              class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
            >
              <Menu class="overflow-hidden w-32 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col gap-2 p-2">
                <For each={props.options}>
                  {(option) => (
                    <MenuItem
                      as="button"
                      class="text-sm p-2 text-left rounded-lg hover:bg-violet-600 hover:text-white focus:outline-none focus:bg-violet-600 focus:text-white"
                      onClick={() => props.onChange(option)}
                    >
                      {option}
                    </MenuItem>
                  )}
                </For>
              </Menu>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

function ChevronDownIcon(props: JSX.IntrinsicElements["svg"]): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
